"use client"
import { Camera, Expand, Users, Mail } from 'lucide-react';
import React, { useCallback, useContext, useRef, useState } from 'react'
import { UserContext } from './Contexts/UserContext';
import Image from 'next/image';
import LightBox from './LightBox';
import { uploadProfileCover, uploadProfilePhoto } from '../services/UserServices';
import Cropper from 'react-easy-crop';


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

  // ── cover state (unchanged) ──────────────────────────────────────────────
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

  // ────────────────────────────────────────────────────────────────────────
  return (
    <div>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,.06)] sm:rounded-[28px]">
        <div className="group/cover relative from-gray-600 to-gray-800 h-44 sm:h-52 lg:h-60 bg-[linear-gradient(112deg,#0f172a_0%,#1e3a5f_36%,#2b5178_72%,#5f8fb8_100%)]">
          {previewCover ? (
            <img src={previewCover} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            user?.cover && <Image src={user.cover} alt="cover" fill priority className="object-cover" />
          )}

          <div className="pointer-events-none absolute right-2 top-2 z-10 flex max-w-[90%] flex-wrap items-center justify-end gap-1.5 opacity-100 transition duration-200 sm:right-3 sm:top-3 sm:max-w-none sm:gap-2 sm:opacity-0 sm:group-hover/cover:opacity-100 sm:group-focus-within/cover:opacity-100">
            {!previewCover &&
              <label className="pointer-events-auto inline-flex cursor-pointer items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                <Camera size={13} strokeWidth={2} />
                {user?.cover ? "Change Cover" : "Add Cover"}
                <input accept="image/*" className="hidden" type="file" onChange={handleCoverChange} />
              </label>
            }
            {user?.cover && !previewCover &&
              <button type="button" onClick={() => setOpenCover(true)} className="pointer-events-auto inline-flex items-center gap-1 rounded-lg bg-black/45 px-2 py-1 text-[11px] font-bold text-white backdrop-blur transition hover:bg-black/60 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs">
                <Expand size={13} strokeWidth={2} />
                View cover
              </button>
            }
            {previewCover && <>
              <button onClick={handleCoverSave} disabled={isUploadingCover} className="pointer-events-auto rounded-lg bg-blue-600 px-5 py-2 cursor-pointer text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60">
                {isUploadingCover ? "Saving..." : "Save"}
              </button>
              <button onClick={handleCoverDiscard} disabled={isUploadingCover} className="pointer-events-auto rounded-lg px-5 py-2 cursor-pointer text-xs font-bold text-gray-700 hover:bg-gray-200 bg-gray-300 disabled:opacity-60">
                Discard
              </button>
            </>}
          </div>
        </div>

        <div className="relative -mt-12 px-3 pb-5 sm:-mt-16 sm:px-8 sm:pb-6">
          <div className="rounded-3xl border border-white/60 bg-white/92 p-5 backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-end gap-4">
                  {/* Avatar */}
                  <div className="group/avatar relative shrink-0">
                    <button type="button" className="cursor-pointer rounded-full">
                      <img
                        className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md ring-2 ring-[#dbeafe]"
                        src={user?.photo}
                        alt={user?.name}
                      />
                    </button>

                    <label className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#1877f2] text-white opacity-100 shadow-sm transition duration-200 hover:bg-[#166fe5] sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100">
                      <Camera size={17} strokeWidth={2} />
                      <input accept="image/*" className="hidden" type="file" onChange={handlePhotoChange} />
                    </label>
                    <button
                      type="button"
                      onClick={() => setOpenProfile(true)}
                      className="absolute bottom-1 left-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white text-[#1877f2] opacity-100 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:bg-slate-50 sm:opacity-0 sm:group-hover/avatar:opacity-100 sm:group-focus-within/avatar:opacity-100"
                      title="View profile photo"
                      aria-label="View profile photo"
                    >
                      <Expand size={16} strokeWidth={2} />
                    </button>
                  </div>

                  <div className="min-w-0 pb-1">
                    <h2 className="truncate text-2xl font-black tracking-tight text-slate-900 sm:text-4xl">{user?.name}</h2>
                    <p className="mt-1 text-lg font-semibold text-slate-500 sm:text-xl">@</p>
                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-[#d7e7ff] bg-[#eef6ff] px-3 py-1 text-xs font-bold text-[#0b57d0]">
                      <Users size={13} strokeWidth={2} />
                      Route Posts member
                    </div>
                  </div>
                </div>
              </div>

              {/* Followers / Following / Bookmarks */}
              <div className="grid w-full grid-cols-3 gap-2 lg:w-[520px]">
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Followers</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{user?.followersCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Following</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">{user?.followingCount}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white px-3 py-3 text-center sm:px-4 sm:py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500 sm:text-xs">Bookmarks</p>
                  <p className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">0</p>
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-sm font-extrabold text-slate-800">About</h3>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <p className="flex items-center gap-2">
                    <Mail size={15} strokeWidth={2} className="text-slate-500" />
                    muhammedkhaled7882@gmail.com
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={13} strokeWidth={2} />
                    Active on Route Posts
                  </p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">My posts</p>
                  <p className="mt-1 text-2xl font-black text-slate-900">500</p>
                </div>
                <div className="rounded-2xl border border-[#dbeafe] bg-[#f6faff] px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#1f4f96]">Saved posts</p>
                  <p className="mt-1 text-2xl font-black text-slate-900">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openProfile && user?.photo && <LightBox src={user.photo} onClose={() => setOpenProfile(false)} />}
        {openCover && user?.cover && <LightBox src={user.cover} onClose={() => setOpenCover(false)} />}
      </section>
      {rawPhotoSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

            {/* Header */}
            <div className="px-6 pt-6 pb-2">
              <h2 className="text-lg font-bold text-slate-900">Adjust profile photo</h2>
              <p className="mt-0.5 text-sm text-slate-500">Drag to reposition and use zoom for perfect framing.</p>
            </div>
            <div className="relative mx-6 mt-4 h-80 overflow-hidden rounded-xl bg-slate-100">
              <Cropper
                image={rawPhotoSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>

            <div className="px-6 pt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-slate-700">Zoom</span>
                <span className="text-sm font-semibold text-slate-500">{zoom.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={e => setZoom(Number(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>
            <div className="px-6 pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Post Privacy</p>
              <select
                value={privacy}
                onChange={e => setPrivacy(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="public">Public</option>
                <option value="friends">Friends</option>
                <option value="private">Only me</option>
              </select>
            </div>
            <div className="flex justify-end gap-3 px-6 py-5">
              <button
                onClick={handlePhotoDiscard}
                disabled={isUploadingPhoto}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60 transition"
              >
                Cancel
              </button>
              <button
                onClick={handlePhotoSave}
                disabled={isUploadingPhoto}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-60 transition"
              >
                {isUploadingPhoto ? "Saving..." : "Save photo"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}