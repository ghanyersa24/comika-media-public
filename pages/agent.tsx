import { NextPage } from 'next'

interface Props {
  userAgent?: string;
  isMobile
}

const Page: NextPage<Props> = ({ userAgent, isMobile }) => (
  <main>
    Your user agent:
    {userAgent}
    <br />
    xlx
    {isMobile}
  </main>
)

Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  const isMobile = Boolean(userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i,
  ))
  return { userAgent, isMobile }
}

export default Page
