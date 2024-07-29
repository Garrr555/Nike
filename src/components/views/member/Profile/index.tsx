import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function ProfileMemberView({ profile, setProfile, session }: any) {

  console.log(session)

  const [changeImage, setChangeImage] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false)
  console.log(changeImage)
  console.log(changeImage.name)

  console.log(profile);

  const [visible, setVisible] = useState(true)

  function handleVisible(){
    setVisible(!visible)
  }

  function handleChangeProfilePicture(e: any){
    e.preventDefault()
    setIsLoading(true)
    const file = e.target[0]?.files[0]
    if(file){
      uploadFile(profile.id, file, async (status: boolean, newImageURL: string) => {
        if(status){
          const data = {
            image: newImageURL,
          };
          const result = await userServices.updateProfile(
            profile.id,
            data,
            session.data?.accessToken
          );

          console.log(result);

          if (result.status === 200) {
            setIsLoading(false);
            setProfile({
              ...profile,
              image: newImageURL,
            });
            setChangeImage({});
            e.target[0].value = "";
          } else {
            setIsLoading(false);
          } 
        }
        else{
          setIsLoading(false)
          setChangeImage({})
        }
      })
    }
  }

  return (
    <MemberLayout>
      <h1 className="text-[32px] font-bold">Profile</h1>
      <div className="flex gap-5 mt-10">
        <div className="w-[25%] flex flex-col items-center justify-center border shadow-lg rounded-xl p-10 ">
          {profile.image ? (
            <Image
              className="rounded-full w-[80%] h-[80%]"
              src={profile.image}
              alt="profile"
              width={200}
              height={200}
            />
          ) : (
            <Image
              className="rounded-full w-[80%] h-[80%]"
              src={profile.image}
              alt="profile"
              width={200}
              height={200}
            />
          )}
          <form onSubmit={handleChangeProfilePicture} className="w-full">
            <label
              htmlFor="upload-image"
              className="mt-5 bg-[#eee] flex flex-col items-center justify-center text-center gap-5 p-5 cursor-pointer rounded-lg"
            >
              {changeImage.name ? (
                <p>{changeImage.name}</p>
              ) : (
                <>
                  <p>
                    Upload a new avatar, Large image will be resized
                    automatically
                  </p>
                  <p>
                    Maximum upload size is <b>1 MB</b>
                  </p>
                </>
              )}
            </label>
            <input
              type="file"
              name="image"
              id="upload-image"
              className="opacity-0 absolute -z-10"
              onChange={(e: any) => {
                e.preventDefault();
                setChangeImage(e.currentTarget.files[0]);
              }}
            />
            <Button type="submit" variant="bg-dark mt-5 w-full">
              {isLoading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className="w-[75%]  border shadow-lg py-5 rounded-xl">
          <form action="">
            <div className="p-10">
              <div className="font-semibold">Fullname</div>
              <div className="pl-3 bg-gray-200 rounded-lg">
                <Input
                  name="fullname"
                  defaultValue={profile.fullname}
                  type="text"
                  disable={false}
                  visible={false}
                />
              </div>
            </div>
            <div className="py-5 px-10">
              <div className="font-semibold">Email</div>
              <div className="pl-3 bg-gray-200 rounded-lg">
                <Input
                  name="email"
                  defaultValue={profile.email}
                  type="email"
                  disable={true}
                  visible={false}
                />
              </div>
            </div>
            <div className="py-5 px-10">
              <div className="font-semibold">Phone</div>
              <div className="pl-3 bg-gray-200 rounded-lg">
                <Input
                  name="phone"
                  defaultValue={profile.phone}
                  type="text"
                  disable={true}
                  visible={false}
                />
              </div>
            </div>
            {/* <div className="py-5 px-10">
            <div className="font-semibold">Password</div>
            <div className="pl-3 bg-gray-200 rounded-lg">
             <Input
              name="password"
              defaultValue={profile.password}
              type="password"
              visible={visible}
              handleVisible={handleVisible}
              disable={true}
            /></div>
          </div> */}
            <div className="w-full px-10 flex justify-end">
              <Button type="submit" variant="bg-primary font-semibold">
                Update Profile
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
}
