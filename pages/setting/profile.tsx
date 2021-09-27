import React, { ReactElement, useState } from 'react'

import { GetServerSideProps } from 'next'
import mobile from 'is-mobile'
import { ProfileCard } from '../../components/form/profile'
import { Get as GetProfile, UpdateProfile } from '../../service/user-profile'
import Layout from '../../components/layout'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'

const isMobile = mobile()

export const Profile = ():ReactElement => {
  const { data, mutate } = GetProfile()
  const [canEdit, setCanEdit] = useState(true)

  const handleEdit = () => {
    setCanEdit(!canEdit)
  }
  const handleSubmit = async (profileData) => {
    try {
      const result = await UpdateProfile(profileData)
      mutate()
      setCanEdit(true)
      console.log('🚀 ~ file: profile.tsx ~ line 24 ~ handleSubmit ~ result', result)
    } catch (error) {
      console.log('handleSubmit -> error', error)
    }
  }

  return (
    <Layout isMobile={isMobile}>
      <TopNavbarWithBackButton title="Detail Akun" />
      <div className="container max-w-screen-xl mx-auto xs:px-4 lg:px-4 sm:px-8 lg:mt-24">

        <ProfileCard
          profileData={data}
          canEdit={canEdit}
          onEdit={handleEdit}
          onSubmit={handleSubmit}
        />

      </div>
    </Layout>

  )
}

export default Profile
