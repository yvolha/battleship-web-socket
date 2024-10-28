import { CustomWebSocket } from "../../../index";
import { regUserInDb } from "../../database/database";
import getIsUserInvalid from "../../utils/get-is-user-invalid";
import { getUserRegisteredMessage } from "../../utils/get-success-messages";
import { IParsedMessage } from "../handle-message.type";

export const handleReg = async (
  parsedMessage: IParsedMessage,
  wsClient: CustomWebSocket,
  wsMessageType: string
) => {
  const { name, password } = JSON.parse(parsedMessage.data.toString());
  const index = wsClient.id;

  const errorText = getIsUserInvalid(name);

  if (errorText) {
    wsClient.send
      JSON.stringify({
        type: wsMessageType,
        data: JSON.stringify({
          name,
          index,
          error: true,
          errorText,
        }),
        id: 0,
      }
    );
  } else {
    wsClient.send(
      JSON.stringify({
        type: wsMessageType,
        data: JSON.stringify({
          name,
          index,
          error: false,
          errorText: "",
        }),
        id: 0,
      })
    );

    await regUserInDb(index, name, password);
    console.log(getUserRegisteredMessage(index, name));
  }
};