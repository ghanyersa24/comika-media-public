import React, { ReactElement, useState, useEffect } from 'react'

import { GetServerSideProps } from 'next'
import { ProfileCard } from '../../components/form/profile'
import { Get as GetProfile, UpdateProfile } from '../../service/user-profile'
import { Profile as ProfileType } from '../../res/interface'
import Layout from '../../components/layout'
import TopNavbarWithBackButton from '../../components/navigation/top-navbar-with-back-button'

export const Profile = ({ isMobile }:{isMobile:boolean}):ReactElement => {
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
