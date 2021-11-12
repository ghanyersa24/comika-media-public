import React, { FunctionComponent } from 'react'
import { Notification } from '../../../res/interface'
import TopNavbarWithBackButton from '../../navigation/top-navbar-with-back-button'
import markdownStyles from '../../markdown-styles.module.css'

type propsTypes = {
	notification: Notification
}

const NotificationNonTransaction:FunctionComponent<propsTypes> = ({ notification }) => (
  <div className="absolute top-0 w-full min-h-screen bg-primary">
    <TopNavbarWithBackButton
      title="Rincian Pembayaran"
    />
    <div className="max-w-screen-lg min-h-screen px-4 py-4 mt-16 bg-white md:mx-auto md:my-16 rounded-t-2xl">
      <h1 className="font-bold">{notification.title}</h1>
      <img src={notification.img} alt="" />
      <div
        className={markdownStyles.markdown}
        dangerouslySetInnerHTML={{ __html: notification.descriptionHtml }}
      />
    </div>

  </div>
)

export default NotificationNonTransaction
