import { defineMessage, defineMessages } from '@/utils/translation';
import React from 'react'

const message = defineMessage({
  id: "src.components.Message.newId",
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
        <FormattedMessage id="src.components.Message.abcabcd">Message</FormattedMessage>
        <div><FormattedMessage defaultMessage="Hello I'm Andy" description="" id="src.components.Message.11111"/></div>
    </div>
  )
}

export default Message