import { defineMessage, defineMessages } from '@/utils/translation';
import React from 'react'
import FormattedMessage from '../FormattedMessage';

const message = defineMessage({
  id: "src.components.Message.hello3",
  defaultMessage: "default message 1"
})

const messages = defineMessages({
  message1: {
    id: "src.components.Message.hello1",
    defaultMessage: "default message 2"
  },
  message2: {
    id: "src.components.Message.hello2",
    defaultMessage: "default message 3"
  }
})

function Message() {
  const hehe = 123;
  return (
    <div>
      <FormattedMessage id="src.components.Message.abcd">Message</FormattedMessage>
      <div><FormattedMessage defaultMessage="Hello I'm Andy" description="" id="src.components.Message.11111" /></div>
      <FormattedMessage id="src.components.Message.btnBack" defaultMessage="Trở về" />
      <FormattedMessage id="src.components.Message.btnNext" defaultMessage="Tiếp theo" />
    </div>
  )
}

export default Message