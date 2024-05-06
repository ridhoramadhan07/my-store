import MemberLayout from '@/components/layouts/MemberLayout';
import styles from './Profile.module.scss';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { uploadFile } from '@/lib/firebase/service';
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react';
import userServices from '@/services/user';
import { User } from '@/types/user.type';

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};


const ProfileMemberView = ({  setToaster }: propTypes) => {

  const [changeImage, setChangeImage] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState('');
  const [profile, setProfile] = useState<User |any >({});
  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  useEffect(() => {
    getProfile();
  }, []);
  


  const heandleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading('profile');
    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };
    const result = await userServices.updateProfile(data);
    if (result.status === 200 && result.data) {
      setIsLoading('');
      setProfile({
        ...profile,
        fullname: data.fullname,
        phone: data.phone,
      });
      form.reset();
      setToaster({
        variant: 'success',
        message: 'Success Update Profile ',
      });
    } else {
      setIsLoading('');
    }
  };
  const heandleChangeProfilePicture = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading('picture');
    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = 'profile.' + file.name.split('.')[1];

    if (file) {
      uploadFile(profile.id, file, newName, 'users', async (status: boolean, newImageUrl: string) => {
        if (status) {
          const data = {
            image: newImageUrl,
          };
          const result = await userServices.updateProfile(data);
          if (result.status === 200 && result.data) {
            setIsLoading('');
            setProfile({
              ...profile,
              image: newImageUrl,
            });
            setChangeImage({});
            form.reset();

            setToaster({
              variant: 'success',
              message: 'Success Change Avatar',
            });
          } else {
            setIsLoading('');
          }
        } else {
          setIsLoading('');
          setChangeImage({});
          setToaster({
            variant: 'danger',
            message: 'Failed Change Avatar',
          });
        }
      });
    }
  };

  const heandleChangePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading('password');
    const form = e.target as HTMLFormElement;
    const data = {
      password: form['new-password'].value,
      oldPassword: form['old-password'].value,
      encryptedPassword: profile.password,
    };
    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200 && result.data) {
        setIsLoading('');
        form.reset();
        setToaster({
          variant: 'success',
          message: 'Success Change Password',
        });
      }
    } catch (error) {
      setIsLoading('');
      setToaster({
        variant: 'danger',
        message: 'Failed Change Password',
      });
    }
  };

  return (
    <>
      <MemberLayout>
        <h1 className={styles.profile__title}>Profile</h1>
        <div className={styles.profile__main}>
          <div className={styles.profile__main__row}>
            <div className={styles.profile__main__row__avatar}>
              <h2 className={styles.profile__main__row__avatar__title}>Avatar</h2>
              {profile.image ? (
                <Image className={styles.profile__main__row__avatar__image} src={profile.image} alt="avatar" width={200} height={200} />
              ) : (
                <div className={styles.profile__main__row__avatar__image}>{profile?.fullname?.charAt(0)}</div>
              )}
              <form onSubmit={heandleChangeProfilePicture}>
                <label className={styles.profile__main__row__avatar__label} htmlFor="upload-image">
                  {changeImage.name ? (
                    <p>{changeImage.name}</p>
                  ) : (
                    <>
                      <p>Upload a new avatar larger than 200x200</p>
                      <p>
                        maximum size <b>1 mb</b>
                      </p>
                    </>
                  )}
                </label>
                <input
                  className={styles.profile__main__row__avatar__input}
                  type="file"
                  name="image"
                  id="upload-image"
                  onChange={(e: any) => {
                    e.preventDefault();
                    setChangeImage(e.target.files[0]);
                  }}
                />
                <Button className={styles.profile__main__row__avatar__btn} type="submit" variant="primary">
                  {isLoading === 'picture' ? 'Uploading...' : ' Upload'}
                </Button>
              </form>
            </div>
            <div className={styles.profile__main__row__profile}>
              <h2 className={styles.profile__main__row__profile__title}>Profile</h2>
              <form onSubmit={heandleChangeProfile}>
                <Input label="Fullname" name="fullname" type="text" defaultValue={profile.fullname} />
                <Input label="Phone" name="phone" type="number" defaultValue={profile.phone} placeholder="Input your phone number" />
                <Input label="Email" name="email" type="email" defaultValue={profile.email} disabled />
                <Input label="Role" name="role" type="text" defaultValue={profile.role} disabled />

                <Button className={styles.profile__main__row__profile__btn} type="submit" variant="primary">
                  {isLoading === 'profile' ? 'Loading...' : 'Update Profile'}
                </Button>
              </form>
            </div>
            <div className={styles.profile__main__row__password}>
              <h2 className={styles.profile__main__row__password__title}>Change Password</h2>
              <form onSubmit={heandleChangePassword}>
                <Input label="Old Password" name="old-password" type="password" disabled={profile.type === 'google'} placeholder="Enter your old password" />
                <Input label="New Password" name="new-password" type="password" disabled={profile.type === 'google'} placeholder="Enter your new password" />
                <Button disabled={isLoading === 'password' || profile.type === 'google'} type="submit">
                  {isLoading === 'password' ? 'Loading...' : 'Change Password'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </MemberLayout>
    </>
  );
};

export default ProfileMemberView;
