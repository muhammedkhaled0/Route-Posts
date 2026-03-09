import { Camera, Expand } from "lucide-react"

export default function AvatarSection({
 user,
 handlePhotoChange,
 setOpenProfile
}:any){

return(

<div className="relative">

<img
src={user?.photo}
className="w-28 h-28 rounded-full object-cover"
/>

<label className="absolute bottom-0 right-0 cursor-pointer">
<Camera size={18}/>
<input hidden type="file" onChange={handlePhotoChange}/>
</label>

<button
className="absolute bottom-0 left-0"
onClick={()=>setOpenProfile(true)}
>
<Expand size={16}/>
</button>

</div>

)

}