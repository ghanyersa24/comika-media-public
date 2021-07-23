import React, { ReactElement, useState, useEffect } from 'react'

import { GetServerSideProps } from 'next'
import { ProfileCard } from '../../components/form/profile'
import { Get as GetProfile, UpdateProfile } from '../../service/user-profile'
import { Profile as ProfileType } from '../../res/interface'
import Layout from '../../components/layout'

export const Profile = ({ isMobile }:{isMobile:boolean}):ReactElement => {
  console.log('🚀 ~ file: profile.tsx ~ line 10 ~ Profile ~ isMobile', isMobile)
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
    <Layout isMobile={isMobile}>
      <div className="container mx-auto xs:px-4 lg:px-4 sm:px-8 max-w-screen-xl lg:mt-24">
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
      </div>
    </Layout>

  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const UA = context.req.headers['user-agent']
  const isMobile = Boolean(UA.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))

  // will be passed to the page component as props
  return {
    props: {
      isMobile,
    },
  }
}
export default Profile
