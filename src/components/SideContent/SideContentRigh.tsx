import React, { useState, Dispatch, ElementType, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { P, Red, SideContainer } from './style/SideContent.style';
import { FolderMenu } from './FolderMenu/FolderMenu';
import { useAuth, useLoginModalhandler } from 'src/hooks';
import { Button, Empty } from '../common';
import { Noticei } from 'src/icons';
import { NotiList } from './content/NotiList';

interface Props {
  folderOpenFalse?: boolean;
}
export const SideContentRight = ({ folderOpenFalse }: Props) => {
  const [visible, setVisible] = useState(false);
  const { auth } = useAuth();
  const { setLoginModal } = useLoginModalhandler();

  return (
    <SideContainer>
      {/* <P>최신 글</P> */}
      <FolderMenu
        childOpen={!folderOpenFalse}
        title={
          <>
            🔥 <Red>New </Red> Questions
          </>
        }
      >
        <Empty />
      </FolderMenu>
      <br />
      {/* <P>최신 글</P> */}
      <FolderMenu childOpen={!folderOpenFalse} icon={<Red>🌱</Red>} title="신규 프로젝트 ">
        <Empty />
      </FolderMenu>{' '}
      <br />
      <br />
      <FolderMenu childOpen={!folderOpenFalse} icon={<Red>🔢 </Red>} title={<>Tag Cloud</>}>
        <Empty />
      </FolderMenu>{' '}
      <FolderMenu icon={<Noticei size="20px" />} childOpen={!folderOpenFalse} title="공지사항" href="/notice">
        <NotiList />
      </FolderMenu>
    </SideContainer>
  );
};
