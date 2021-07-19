import React, { ReactElement, useState, useEffect } from 'react'

import Container from '../../components/container-padding'
import { ProfileCard } from '../../components/form/profile'
import { Get as GetProfile, UpdateProfile } from '../../service/user-profile'
import { Profile as ProfileType } from '../../res/interface'

export const Profile = ():ReactElement => {
  console.log('🚀 ~ file: profile.tsx ~ line 2 ~ Profile ~ params')
  const { data, isLoading, mutate } = GetProfile()
  const [canEdit, setCanEdit] = useState(true)
  const [profileData, setProfileData] = useState<ProfileType|null>()
  const [errorMsg, setErrorMsg] = useState<string>(null)

  useEffect(() => {
    if (data && !isLoading) setProfileData(data)
  }, [data, isLoading])
  const handleEdit = () => {
    setCanEdit(!canEdit)
  }
  const handleSubmit = async () => {
    try {
      const result = await UpdateProfile(profileData)
      mutate()
      setCanEdit(true)
      console.log('🚀 ~ file: profile.tsx ~ line 24 ~ handleSubmit ~ result', result)
      setErrorMsg(null)
    } catch (error) {
      setErrorMsg(error.msg)
    }
  }

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setProfileData({ ...profileData, [name]: type === 'checkbox' ? checked : value })
  }
  return (
    <Container className="mt-24">
      {errorMsg ? (
        <div className="bg-red-200 p-2 mb-4 rounded">
          {errorMsg}
        </div>
      ) : null}
      <ProfileCard
        profileData={profileData}
        onChange={handleChangeValue}
        canEdit={canEdit}
        onEdit={handleEdit}
        onSubmit={handleSubmit}
      />
    </Container>
  )
}

export default Profile
