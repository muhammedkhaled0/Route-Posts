"use client"
import React, { useCallback, useContext, useState } from 'react'
import { UserContext } from './Contexts/UserContext';
import LightBox from './LightBox';
import { uploadProfileCover, uploadProfilePhoto } from '../services/UserServices.action';
import PhotoCropModal from './CropModal';
import CoverSection from './CoverSection';
import AboutSection from './AboutSection';
import ProfileInfo from './ProfileInfo';
import StatsSection from './StatesSection';
interface Area { x: number; y: number; width: number; height: number }

async function getCroppedBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const image = await createImageBitmap(await (await fetch(imageSrc)).blob());
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(
    image,
    pixelCrop.x, pixelCrop.y,
    pixelCrop.width, pixelCrop.height,
    0, 0,
    pixelCrop.width, pixelCrop.height,
  );
  return new Promise((res, rej) =>
    canvas.toBlob(b => b ? res(b) : rej(new Error('Canvas empty')), 'image/jpeg', 0.92)
  );
}
export default function HeaderProfile() {

  const { user } = useContext(UserContext);
  
  const [previewCover, setPreviewCover] = useState<string | null>(null);
  const [selectedCover, setSelectedCover] = useState<File | null>(null);
  const [isUploadingCover, setIsUploadingCover] = useState(false);

  const [rawPhotoSrc, setRawPhotoSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const [privacy, setPrivacy] = useState('public');
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  const [openCover, setOpenCover] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedCover(file);
    setPreviewCover(URL.createObjectURL(file));
  }

  async function handleCoverSave() {
    if (!selectedCover) return;
    try {
      setIsUploadingCover(true);
      const formData = new FormData();
      formData.append("cover", selectedCover);
      formData.append("privacy", "public");
      await uploadProfileCover(formData);
      setPreviewCover(null);
      setSelectedCover(null);
    } finally {
      setIsUploadingCover(false);
    }
  }

  function handleCoverDiscard() {
    setPreviewCover(null);
    setSelectedCover(null);
  }

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRawPhotoSrc(URL.createObjectURL(file));
  }

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function handlePhotoSave() {
    if (!rawPhotoSrc || !croppedAreaPixels) return;

    try {
      setIsUploadingPhoto(true);

      const blob = await getCroppedBlob(rawPhotoSrc, croppedAreaPixels);

      const formData = new FormData();
      formData.append("photo", blob, "profile.jpg");
      formData.append("privacy", privacy);

      await uploadProfilePhoto(formData);

      setRawPhotoSrc(null);

    } finally {
      setIsUploadingPhoto(false);
    }
  }

  function handlePhotoDiscard() {
    setRawPhotoSrc(null);
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">

      <CoverSection
        user={user}
        previewCover={previewCover}
        isUploadingCover={isUploadingCover}
        handleCoverChange={handleCoverChange}
        handleCoverSave={handleCoverSave}
        handleCoverDiscard={handleCoverDiscard}
        setOpenCover={setOpenCover}
      />

      <ProfileInfo
        user={user}
        handlePhotoChange={handlePhotoChange}
        setOpenProfile={setOpenProfile}
      />
<div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr] px-3 sm:px-8 pb-6">

  <AboutSection user={user} />

  <StatsSection user={user} />

</div>
      {openProfile && user?.photo && <LightBox src={user.photo} onClose={() => setOpenProfile(false)} />}
      {openCover && user?.cover && <LightBox src={user.cover} onClose={() => setOpenCover(false)} />}

      {rawPhotoSrc &&
        <PhotoCropModal
          rawPhotoSrc={rawPhotoSrc}
          crop={crop}
          zoom={zoom}
          privacy={privacy}
          setCrop={setCrop}
          setZoom={setZoom}
          setPrivacy={setPrivacy}
          onCropComplete={onCropComplete}
          handlePhotoDiscard={handlePhotoDiscard}
          handlePhotoSave={handlePhotoSave}
          isUploadingPhoto={isUploadingPhoto}
        />
      }

    </section>
  )
}