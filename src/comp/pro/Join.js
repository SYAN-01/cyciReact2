import { useState } from 'react';

function Study() {
  const [아이디, 확인아이디] = useState('');
  const [비밀번호, 확인비밀번호] = useState('');
  const [이메일주소, 확인이메일] = useState('');
  const [성별, 확인성별] = useState('');
  const [sel, setSel] = useState('1학년');

  const hobbyList = [
    { name: '독서' },
    { name: '악기연주' },
    { name: '프라모델 조립' },
    { name: '자기' },
    { name: '여행' }
  ];

  const [hobby, setHobby] = useState([]);  // 취미를 선택할 상태

  // 취미 체크박스 상태 관리
  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setHobby((prevHobbies) => [...prevHobbies, value]);  // 체크된 항목 추가
    } else {
      setHobby((prevHobbies) => prevHobbies.filter((h) => h !== value));  // 체크 해제된 항목 제거
    }
  };

  return (
    <div className="App">
      <h1>로그인</h1>
      <input
        type="text"
        placeholder="아이디"
        value={아이디}
        onChange={(e) => 확인아이디(e.target.value)}
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={비밀번호}
        onChange={(e) => 확인비밀번호(e.target.value)}
      />

      <input
        type="text"
        placeholder="이메일주소"
        value={이메일주소}
        onChange={(e) => 확인이메일(e.target.value)}
      />

      <h4>성별</h4>
      <input
        type="radio"
        name="성별"
        value="남"
        checked={성별 === '남'}
        onChange={(e) => 확인성별(e.target.value)}
      />{' '}
      남
      <input
        type="radio"
        name="성별"
        value="여"
        checked={성별 === '여'}
        onChange={(e) => 확인성별(e.target.value)}
      />{' '}
      여

      <h4>학년</h4>
      <select value={sel} onChange={(e) => setSel(e.target.value)}>
        <option value="1학년">1학년</option>
        <option value="2학년">2학년</option>
        <option value="3학년">3학년</option>
        <option value="4학년">4학년</option>
      </select>

      <h1>취미 선택</h1>
      {hobbyList.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={item.name}
            checked={hobby.includes(item.name)} // 체크 상태 동기화
            onChange={handleHobbyChange} // 취미 선택/해제 처리
          />
          {item.name}
        </div>
      ))}

      <input
        type="button"
        value="회원가입"
        onClick={() => {
          console.log('아이디:', 아이디);
          console.log('비밀번호:', 비밀번호);
          console.log('이메일주소:', 이메일주소);
          console.log(`학년: ${sel}`);
          console.log('성별:', 성별);
          console.log('취미:', hobby.join(', ')); // 선택된 취미 출력

          // 입력값 초기화
          확인아이디('');
          확인비밀번호('');
          확인이메일('');
          setHobby([]); // 취미 상태 초기화
        }}
      />
    </div>
  );
}

export default Study;