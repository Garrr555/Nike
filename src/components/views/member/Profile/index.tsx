import MemberLayout from "@/components/layouts/MemberLayout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { uploadFile } from "@/lib/firebase/service";
import userServices from "@/services/user";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function ProfileMemberView({
  profile,
  setProfile,
  session,
}: any) {
  console.log(session);
   console.log(profile);

  const [changeImage, setChangeImage] = useState<any>({});
  const [isLoading, setIsLoading] = useState('');

  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(true);

  function handleVisible() {
    setVisible(!visible);
  }
  function handleVisible2() {
    setVisible2(!visible2);
  }

  const handleChangeProfilePicture = (e: any) => {
    e.preventDefault();
    setIsLoading('picture');
    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newImageURL: string) => {
          console.log(status);
          if (status) {
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
              setIsLoading('');
              setProfile({
                ...profile,
                image: newImageURL,
              });
              console.log(profile);
              setChangeImage({});
              e.target[0].value = "";
            } else {
              setIsLoading('');
            }
          } else {
            setIsLoading('');
            setChangeImage({});
          }
        }
      );
    }
  };

  async function handleChangeProfile(e: any) {
    e.preventDefault();
    setIsLoading('profile');
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    console.log(result);

    if (result.status === 200) {
      setIsLoading('');
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
    } else {
      setIsLoading('');
    }
  }

  async function handleChangePassword(e: any){
    e.preventDefault();
    setIsLoading('password');
    const form = e.target as HTMLFormElement;
    const data = {
      password: form['new-password'].value,
      oldPassword: form['old-password'].value,
      encryptedPassword: profile.password
    };
    console.log(data)
    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );

    console.log(result);

    if (result.status === 200) {
      setIsLoading('');
      form.reset();
    } else {
      setIsLoading('');
    }
  }

  console.log(changeImage);
  console.log(changeImage.name);

  return (
    <MemberLayout>
      <h1 className="text-[32px] font-bold">Profile</h1>
      <div className="flex gap-5 mt-10">
        <div className="w-[25%] flex flex-col items-center justify-center border shadow-lg rounded-xl p-10 ">
          <h2 className="px-10 pb-10 font-bold text-3xl">Avatar</h2>
          {profile.image ? (
            <Image
              className="rounded-full w-[80%] h-[80%] border "
              src={profile.image}
              alt="profile"
              width={200}
              height={200}
            />
          ) : (
            <div className="bg-[#eee] rounded-full w-[200px] h-[200px] flex items-center justify-center text-6xl font-bold">
              {profile?.fullname?.charAt(0)}
            </div>
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
            <Button type="submit" variant="bg-primary mt-5 w-full">
              {isLoading === "picture" ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
        <div className="w-[50%]  border shadow-lg py-5 rounded-xl">
          <form onSubmit={handleChangeProfile}>
            <h2 className="px-10 py-5 font-bold text-3xl">Profile</h2>
            <div className="px-10 py-5">
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
              <div className="font-semibold">Phone</div>
              <div className="pl-3 bg-gray-200 rounded-lg">
                <Input
                  name="phone"
                  defaultValue={profile.phone}
                  type="number"
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
              <div className="font-semibold">Role</div>
              <div className="pl-3 bg-gray-200 rounded-lg">
                <Input
                  name="role"
                  defaultValue={profile.role}
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
                {isLoading === "profile" ? "loading..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </div>
        <div className="w-[25%] border shadow-lg rounded-xl p-10 ">
          <h2 className="px-5 pb-10 font-bold text-3xl">Change Password</h2>
          <form onSubmit={handleChangePassword}>
            <div className="pb-5 px-5">
              <div className="font-semibold">Old Password</div>
              <div className="pl-3 bg-gray-200 rounded-lg">
                <Input
                  name="old-password"
                  // defaultValue={profile.password}
                  type="password"
                  visible={visible}
                  handleVisible={handleVisible}
                  disable={false}
                />
              </div>
            </div>
            <div className="py-5 px-5">
              <div className="font-semibold">New Password</div>
              <div className="pl-3 bg-gray-200 rounded-lg">
                <Input
                  name="new-password"
                  // defaultValue={profile.password}
                  type="password"
                  visible={visible2}
                  handleVisible={handleVisible2}
                  disable={false}
                />
              </div>
            </div>
            <div className="w-full px-5 flex justify-end">
              <Button type="submit" variant="bg-primary font-semibold">
                {isLoading === "password" ? "loading..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
}
