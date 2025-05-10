import React from 'react';

interface PrivacyAgreeModalProps {
  onClose: () => void;
  onAgree: () => void;
}

const PrivacyAgreeModal: React.FC<PrivacyAgreeModalProps> = ({ onClose, onAgree }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center animate-in fade-in duration-700">
      <div className="bg-white w-[450px] h-[270px] rounded-lg p-4">
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-semibold">개인정보 수집 및 이용 약관</h2>
          <button
            onClick={onClose}>
            <img src="/img/x.png" className="w-[25px] h-[25px]"></img>
          </button>
        </div>

        <div className="overflow-y-auto h-[200px] text-left">
          <p className="text-sm text-gray-400 p-3">
            본 개인정보 수집 및 이용 동의서에서는 귀하의 개인정보를 수집하여 사용하려는
            목적과 이를 이용하는 방법을 설명합니다.
          </p>

          <div className="p-3">
            <ul className="space-y-1 text-sm">
              <li className="flex gap-2">
                <span className="font-bold min-w-[24px]">1.</span>
                <span>개인정보 수집 항목: 이름, 이메일, 전화번호 등</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[24px]">2.</span>
                <span>개인정보 이용 목적: 서비스 제공 및 관리, 마케팅 등</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold min-w-[24px]">3.</span>
                <span>개인정보 보유 및 이용 기간: 이용자의 동의 철회 또는 서비스 종료 시까지</span>
              </li>
            </ul>
          </div>

          <p className="text-sm text-gray-700 p-3">
            본 약관에 동의하시면 개인정보 수집 및 이용이 가능합니다. 만약 동의하지 않으면
            서비스를 이용할 수 없습니다.
          </p>

          <div className="flex justify-end gap-2 p-4 border-t">
            <button className="rounded bg-blue-800 w-[60px] hover:bg-blue-900 text-white" onClick={onAgree}>
              동의
            </button>
            <button className="rounded w-[60px] border border-gray-200" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAgreeModal;
