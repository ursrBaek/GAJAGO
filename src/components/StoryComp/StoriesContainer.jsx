import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearStorySearchId, setStorySearchId } from '../../redux/actions/story_action';
import Stories from './Stories';
import { StyledContainer } from './styles';

function StoriesContainer({ scrollToTop }) {
  const dispatch = useDispatch();
  const usersInfo = useSelector((state) => state.usersInfo);
  const searchUid = useSelector((state) => state.story.searchId);

  const [sortBy, setSortBy] = useState('timeStamp');
  const [searchText, setSearchText] = useState('');
  const [inputFocus, setInputFocus] = useState(false);
  const [matchedNicknameList, setMatchedNicknameList] = useState([]);
  const [indexOfList, setIndexOfList] = useState(-1);

  const $input = useRef();
  const userInfoList = useMemo(() => {
    if (usersInfo) {
      return Object.entries(usersInfo);
    }
  }, [usersInfo]);

  const focusInput = useCallback(() => {
    $input.current.focus();
    setInputFocus(true);
  }, []);

  const onClickRemoveBtn = useCallback(() => {
    setSearchText('');
    setIndexOfList(-1);
    focusInput();
  }, [focusInput]);

  const updateMatchedNicknameList = useCallback(
    (text) => {
      const checkedList = [];

      userInfoList.forEach((user) => {
        if (user[1].nickname.includes(text)) {
          checkedList.push(user);
        }
      });

      setMatchedNicknameList(checkedList);
      setIndexOfList(-1);
    },
    [userInfoList],
  );

  const onKeyDownHandler = useCallback(
    (e) => {
      if (e.isComposing || e.keyCode === 229) {
        return;
      }

      if (matchedNicknameList.length) {
        if (e.key === 'ArrowDown' && indexOfList < matchedNicknameList.length - 1) {
          setIndexOfList((prev) => {
            setSearchText(matchedNicknameList[prev + 1][1].nickname);
            return prev + 1;
          });
        } else if (e.key === 'ArrowUp' && indexOfList > 0) {
          setIndexOfList((prev) => {
            setSearchText(matchedNicknameList[prev - 1][1].nickname);
            return prev - 1;
          });
        } else if (e.key === 'Enter' && indexOfList > -1) {
          $input.current.blur();
          updateMatchedNicknameList(searchText);
          dispatch(setStorySearchId(matchedNicknameList[indexOfList][0]));
        }
      }
    },
    [matchedNicknameList, indexOfList, searchText, updateMatchedNicknameList, dispatch],
  );

  const onChangeHandler = useCallback(
    (e) => {
      const text = e.target.value;
      setSearchText(text.trim());
      updateMatchedNicknameList(text.trim());
    },
    [updateMatchedNicknameList],
  );

  const onClickListHandler = useCallback(
    (e) => {
      const selectedNickname = usersInfo[e.currentTarget.id].nickname;
      setSearchText(selectedNickname);
      updateMatchedNicknameList(selectedNickname);
      dispatch(setStorySearchId(e.currentTarget.id));
      setInputFocus(false);
      $input.current.blur();
    },
    [usersInfo, updateMatchedNicknameList, dispatch],
  );

  const onClickSortBy = useCallback(
    (sortText) => {
      setSortBy(sortText);
      scrollToTop();
    },
    [scrollToTop],
  );

  const clearSearchId = useCallback(() => {
    dispatch(clearStorySearchId());
    scrollToTop();
  }, [dispatch, scrollToTop]);

  useEffect(() => {
    if (searchUid) {
      const searchNickname = usersInfo[searchUid].nickname;
      setSearchText(searchNickname);
      updateMatchedNicknameList(searchNickname);
    } else {
      setSearchText('');
    }
  }, [searchUid, usersInfo, updateMatchedNicknameList]);

  return (
    <StyledContainer>
      <div className="top">
        <div className="wrapper">
          <h2 onClick={clearSearchId}>Stories</h2>

          <div className={`searchBox ${inputFocus ? 'focused' : ''}`}>
            {!inputFocus && <SearchOutlined style={{ color: '#5c0bdf' }} onClick={focusInput} />}
            <input
              type="text"
              placeholder="닉네임 검색"
              value={searchText}
              onChange={onChangeHandler}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              onKeyDown={onKeyDownHandler}
              ref={$input}
            />
            {searchText.length > 0 && <CloseOutlined className="remove" onClick={onClickRemoveBtn} />}
            {inputFocus && searchText && (
              <div className="resultList">
                {matchedNicknameList.length ? (
                  <ul aria-hidden="true" aria-label="submenu">
                    <p>닉네임을 선택해주세요.</p>
                    {matchedNicknameList.map((user, idx) => {
                      const uid = user[0];
                      const userInfo = user[1];

                      return (
                        <li
                          key={uid}
                          id={uid}
                          className={idx === indexOfList ? 'select' : ''}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          onClick={onClickListHandler}
                        >
                          <img src={userInfo.image} alt={userInfo.nickname} />
                          <span>{userInfo.nickname}</span>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="noResultMsg">일치하는 닉네임이 없습니다.</p>
                )}
              </div>
            )}
          </div>
          <div className="sort">
            <span className={sortBy === 'timeStamp' ? 'active' : ''} onClick={() => onClickSortBy('timeStamp')}>
              최신순
            </span>
            <span className={sortBy === 'likes' ? 'active' : ''} onClick={() => onClickSortBy('likes')}>
              좋아요순
            </span>
          </div>
        </div>
        <div className="mask" />
      </div>
      <Stories sortBy={sortBy} />
    </StyledContainer>
  );
}

export default React.memo(StoriesContainer);
