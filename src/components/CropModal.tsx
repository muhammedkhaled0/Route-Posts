import Cropper from 'react-easy-crop';

export default function PhotoCropModal({
  rawPhotoSrc,
  crop,
  zoom,
  privacy,
  setCrop,
  setZoom,
  setPrivacy,
  onCropComplete,
  handlePhotoDiscard,
  handlePhotoSave,
  isUploadingPhoto
}: any) {

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">

      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

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

        <div className="flex justify-end gap-3 px-6 py-5">
          <button
            onClick={handlePhotoDiscard}
            disabled={isUploadingPhoto}
            className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={handlePhotoSave}
            disabled={isUploadingPhoto}
            className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white"
          >
            {isUploadingPhoto ? "Saving..." : "Save photo"}
          </button>
        </div>

      </div>

    </div>
  )
}