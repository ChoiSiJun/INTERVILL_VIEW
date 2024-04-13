import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '@features/dashboard/components/atoms/Title';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function UpdateList() {
  return (
    <React.Fragment>
      <Title>업데이트 현황</Title>

      <Typography component="p">초기설계 진행</Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        2024 / 04 /02
      </Typography>
      <Typography component="p">컴포넌트화 진행</Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        2024 / 04 /02
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          상세보기
        </Link>
      </div>
    </React.Fragment>
  );
}
