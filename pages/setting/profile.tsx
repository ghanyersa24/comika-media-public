import React, { ReactElement, useState } from 'react'
import Container from '../../components/container-padding'
import { ProfileCard } from '../../components/card/profile'

export const Profile = ():ReactElement => {
  console.log('🚀 ~ file: profile.tsx ~ line 2 ~ Profile ~ params')
  const [profileData, setProfileData] = useState(
    {
      id: 'b253d5fd-8f59-4ab8-9e72-f515f9b91303',
      name: 'Ghany Abdillah Ersa',
      email: 'ghanyersa24@gmail.com',
      role: 'admin',
      phone: null,
      address: null,
      postalCode: null,
      district: null,
      city: null,
      province: null,
      createdAt: '2021-06-18T01:56:55.000Z',
      updatedAt: '2021-06-18T01:56:55.000Z',
      deletedAt: null,
    },
  )
  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      type, checked, name, value,
    } = e.target
    setProfileData({ ...profileData, [name]: type === 'checkbox' ? checked : value })
  }
  return (
    <Container className="mt-24">
      <ProfileCard profileData={profileData} onChange={handleChangeValue} />
    </Container>
  )
}

export default Profile
