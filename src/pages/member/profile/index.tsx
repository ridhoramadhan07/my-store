import ProfileMemberView from '@/components/views/member/Profile';
import userServices from '@/services/user';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type propTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

const ProfilePage = ({ setToaster }: propTypes) => {
  return <ProfileMemberView setToaster={setToaster} />;
};

export default ProfilePage;
