import React, { useEffect, useRef } from "react";
import { usePayOS, PayOSConfig } from "@payos/payos-checkout";
 
interface EmbeddedPaymentProps {
  checkoutUrl: string;
  onSuccess: (event: any) => void;
  onCancel: (event: any) => void;
}
 
const EmbeddedPayment: React.FC<EmbeddedPaymentProps> = ({ checkoutUrl, onSuccess, onCancel }) => {
  // Config chỉ được tạo khi checkoutUrl đã tồn tại (do logic ở cha)
  const payOSConfig: PayOSConfig = {
    RETURN_URL: window.location.origin + "/payment-success",
    ELEMENT_ID: "embedded-payment-container",
    CHECKOUT_URL: checkoutUrl,
    embedded: true,
    onSuccess: onSuccess,
    onCancel: onCancel,
  };
 
  const { open, exit } = usePayOS(payOSConfig);
 
  // Mở ngay khi component này được mount
  useEffect(() => {
    if (checkoutUrl) {
      open();
    }
    // Cleanup khi unmount (đổi phương thức thanh toán)
    return () => {
      exit();
    };
  }, [checkoutUrl, open, exit]);
 
  return (
<div
      id="embedded-payment-container"
      style={{
        height: "500px",
        width: "100%",
        marginTop: "1rem"
      }}
    />
  );
};
 
export default EmbeddedPayment;