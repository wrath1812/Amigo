import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

const OtpContext = createContext<{
    payload: string;
    setPayload: Dispatch<SetStateAction<string>>;
}>({
    payload: '',
    setPayload: () => '',
});

export const OtpProvider = ({ children }: { children: React.ReactNode }) => {
  const [payload, setPayload] = useState<string>('');

  return (
    <OtpContext.Provider value={{ payload, setPayload }}>
      {children}
    </OtpContext.Provider>
  );
};

export const useOtp = () => React.useContext(OtpContext);
