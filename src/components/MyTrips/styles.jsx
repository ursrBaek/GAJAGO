import styled from '@emotion/styled';
import circle from '../../assets/images/penCircle.png';
import underLine from '../../assets/images/underLine.png';
import QMark from '../../assets/images/QMark.png';
import emptyBg from '../../assets/images/emptyBg.png';

export const TripBox = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const InfoBoard = styled.div`
  width: 50%;
  height: 97%;
  background: radial-gradient(#806c56 15%, transparent 16%) 0 0, radial-gradient(#c8ab89 15%, transparent 16%) 8px 8px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 0 1px,
    radial-gradient(rgba(255, 255, 255, 0.1) 15%, transparent 20%) 8px 9px;
  background-color: #c8ab89;
  background-size: 16px 16px;
  background-size: 20px 20px;
  box-shadow: 1px 2px 10px #554430bc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .prevAndNextInfo {
    width: 90%;
    height: 32%;
    margin-top: 4.5%;
    display: flex;
    justify-content: space-between;
  }

  .nail {
    width: 23px;
    height: 23px;
    border-radius: 50%;
    position: absolute;
    box-shadow: 2px 4px 6px #554430bc;
    &.tl {
      background-color: #ff6262;
      border: 3px solid #ee5a5a;
      top: 0;
      left: 0;
    }
    &.tr {
      background-color: #ffc443;
      border: 3px solid #f5bf49;
      top: 0;
      right: 0;
    }
    &.bl {
      background-color: #6fe439;
      border: 3px solid #69d637;
      bottom: 0;
      left: 0;
    }
    &.br {
      background-color: #5252f0;
      border: 3px solid #5656e7;
      bottom: 0;
      right: 0;
    }
  }
`;

export const PlanMemo = styled.div`
  box-shadow: 3px 4px 5px rgba(0, 0, 0, 0.4);
  width: 49%;
  height: 100%;
  font-family: 'Yeon Sung', cursive;
  &.prev {
    background-color: #f8ffee;
  }
  &.next {
    background-color: #fffbe8;
  }
`;

export const PrevPlan = styled.div`
  height: 100%;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .recent {
    color: #6b6868;
  }

  .daysAndRegion {
    display: flex;
    align-items: center;
    justify-content: center;
    p {
      margin: 0 10px 0 0;
    }
    .days {
      font-size: 35px;
      color: #7f36f3;
    }
    .region {
      min-width: 80px;
      height: 40px;
      padding: 0 7px;
      font-size: 28px;
      line-height: 40px;
      vertical-align: middle;
      color: #343238;
      background-color: #fff2c7;
      position: relative;
      box-shadow: 3px 1px 2px rgba(0, 0, 0, 0.2);
      transform: rotateZ(356deg);
      &::after {
        content: '';
        height: 40px;
        width: 15px;
        background-color: #ffe600;
        position: absolute;
        right: -15px;
        top: 0;
        z-index: 1;
        box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.3);
      }
    }
  }
  .detailAddrMsg {
    display: flex;
    max-width: 80%;
    .detailAddr {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`;

export const NoPrevPlan = styled.div`
  color: #555;
  height: 100%;
  font-size: 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .pointString {
    display: flex;
    align-items: center;
    margin: 0;
    .point {
      font-size: 50px;
      color: #8645f0;
      width: 100px;
      line-height: 90px;
      vertical-align: center;
      background-image: url(${circle});
      background-size: cover;
      background-position-y: -5px;
    }
  }
`;

export const NextPlan = styled.div`
  height: 100%;
  font-size: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .next {
    color: #6b6868;
  }
  .region {
    color: #6c3cc5;
  }
  .tripTitle {
    width: 93%;
    .title {
      text-align: center;
      overflow: hidden;
      word-break: keep-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
  .dDay {
    font-size: 50px;
    line-height: 50px;
    color: #ff4800;
  }
`;

export const NoNextPlan = styled.div`
  height: 100%;
  color: #555;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  line-height: 40px;
  background-image: url(${QMark});
  background-repeat: no-repeat;
  background-position: 95% 47%;
  background-size: 35% 35%;
  .underLine {
    padding: 0 10px;
    background-image: url(${underLine});
    background-position-y: -22px;
    background-size: 100%;
    background-repeat: no-repeat;
    .where {
      color: #741dff;
      font-size: 50px;
    }
  }
`;

export const TripListInfo = styled.div`
  background-color: #ddd4f5;
  box-shadow: 3px 5px 6px rgba(0, 0, 0, 0.4);
  width: 90%;
  height: 60%;
  margin-bottom: 4.5%;
  display: flex;
  justify-content: center;
  font-family: 'Yeon Sung', cursive;

  .tripList {
    width: 90%;
    position: relative;
    .memoTitle {
      font-size: 30px;
      text-align: center;
    }
  }
`;

export const Index = styled.div`
  font-size: 20px;
  width: 100%;
  display: flex;
  justify-content: right;
`;

export const Tab = styled.div`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0 4px 3px 4px;
  background-color: #${({ tab }) => (tab ? 'e8f1df' : 'faeddd')};
  border: 2px dashed #${({ tab }) => (tab ? '93c081' : 'ca932d')};
  border-bottom: none;
  cursor: pointer;
  box-shadow: -5px -5px #${({ tab }) => (tab ? 'e8f1df' : 'faeddd')},
    5.5px -5px #${({ tab }) => (tab ? 'e8f1df' : 'f5ece1')}, -2px 5px #${({ tab }) => (tab ? 'e8f1df' : 'faeddd')},
    ${({ tab }) => (tab ? -9 : 9)}px -6px 5px rgba(0, 0, 0, ${({ selected }) => (selected ? 0.2 : 0)});

  z-index: ${({ selected }) => (selected ? 101 : 1)};
`;

export const StyledList = styled.ul`
  font-size: 18px;
  text-align: left;
  background-color: #${({ indexTab }) => (indexTab ? 'e8f1df' : 'faeddd')};
  padding: 6px;
  outline: 6px solid #${({ indexTab }) => (indexTab ? 'e8f1df' : 'faeddd')};
  box-shadow: -3px -7px 3px rgba(0, 0, 0, 0.2);
  z-index: 100;
  width: 100%;
  height: 75%;
  position: absolute;
  border: 2px dashed #${({ indexTab }) => (indexTab ? '93c081' : 'ca932d')};
  li {
    border-radius: 6px;
    background-color: #fff;
    padding: 5px 5px 5px 10px;
    margin-bottom: 5px;
    .date {
      padding-left: 20px;
      font-size: 13px;
      color: #585858;
    }
  }
`;

export const EmptyMessage = styled.div`
  font-family: 'Yeon Sung', cursive;
  height: 100%;
  text-align: center;
  color: #585858;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-image: url(${emptyBg});
  background-size: cover;
  .empty {
    line-height: 140px;
    font-size: 130px;
  }
  .msg {
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Korea = styled.div`
  width: 400px;
  overflow: hidden;

  .region {
    stroke-linejoin: round;
    stroke: #a27fca;
    stroke-width: 4;
    fill: #ffffff;
    &.once {
      fill: #dac4fa;
    }
    &.twice {
      fill: #c198ff;
    }
    &.threeTimes {
      fill: #a76cff;
    }
    &.fourTimes {
      fill: #8635ff;
    }
    &.fiveTimes {
      fill: #671ed4;
    }

    &:hover {
      fill: #4400ff;
    }
  }

  .achievement {
    width: 90%;
    height: 45px;
    display: flex;
    align-items: flex-end;
    position: relative;
    .progress {
      width: 93%;
      margin-bottom: 5px;
      background-color: #d7d3e6;
    }
    .trophy {
      position: absolute;
      right: 1%;
      color: #f0c400;
      font-size: 40px;
    }
  }
`;
