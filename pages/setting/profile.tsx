import Container from '../../components/container-padding'
import { ProfileCard } from '../../components/card/profile'

export const Profile = () => {
  console.log('🚀 ~ file: profile.tsx ~ line 2 ~ Profile ~ params')
  const data = {
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
  }
  return (
    <Container className="mt-16">
      <ProfileCard />
    </Container>
  )
}

export default Profile
