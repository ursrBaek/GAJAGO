import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import StoryCard from './StoryCard';
import { ColumnsWrapper, NoPosts } from './styles';
import { getFirstBatch, getNextBatch, separatePostsByColumn } from './utils';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { useSelector } from 'react-redux';
import FetchMore from './FetchMore';

function Stories({ sortBy }) {
  const uid = useSelector((state) => state.user.currentUser.uid);
  const searchUid = useSelector((state) => state.story.searchId);

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [lastPoint, setLastPoint] = useState({ lastKey: '', lastSortedValue: '' });
  const [myCheckedLikesObj, setMyCheckedLikesObj] = useState({});
  const [lastCardNum, setLastCardNum] = useState(null);

  const fetchMorePosts = useCallback(() => {
    if (lastPoint.lastKey.length > 0) {
      setLoading(true);
      getNextBatch(sortBy, searchUid, lastPoint.lastSortedValue, lastPoint.lastKey)
        .then((res) => {
          setLastPoint({ lastKey: res.nextLastKey, lastSortedValue: res.nextLastSortedValue });
          if (res.posts.length > 0) {
            setPosts((prevPosts) => {
              const newPosts = [...prevPosts, ...res.posts];
              setLastCardNum(newPosts.length - 1);
              return newPosts;
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [sortBy, searchUid, lastPoint]);

  useEffect(() => {
    const db = getDatabase();
    const checkedLikesRef = ref(db, `users/${uid}/checkedLikes`);

    let isComponentMounted = true;

    setLoading(true);

    onValue(checkedLikesRef, (snapshot) => {
      if (snapshot.exists()) {
        const checkedLikes = snapshot.val();
        if (isComponentMounted) {
          setMyCheckedLikesObj(checkedLikes);
        }
      } else {
        if (isComponentMounted) {
          setMyCheckedLikesObj({});
        }
      }
    });

    getFirstBatch(sortBy, searchUid)
      .then((res) => {
        if (isComponentMounted) {
          setPosts(() => {
            const posts = res.posts;
            setLastCardNum(posts.length - 1);
            if (posts.length === 0) {
              setLoading(false);
            }
            return posts;
          });
          setLastPoint({ lastKey: res.lastKey, lastSortedValue: res.lastSortedValue });
        }
      })
      .catch((e) => {
        console.log(e);
        if (isComponentMounted) {
          setLoading(false);
        }
      });

    return () => {
      isComponentMounted = false;
      off(checkedLikesRef);
    };
  }, [searchUid, sortBy, uid]);

  return (
    <>
      <div>
        {posts?.length > 0 ? (
          <ColumnsWrapper>
            {separatePostsByColumn(posts).map((column, idx) => (
              <div className="storiesColumn" key={idx}>
                {column.map((post) => {
                  return (
                    <StoryCard
                      isLastCard={post.num === lastCardNum}
                      postInfo={post}
                      key={post.key}
                      setLoading={setLoading}
                      myCheckedLikesObj={myCheckedLikesObj}
                    />
                  );
                })}
              </div>
            ))}
          </ColumnsWrapper>
        ) : (
          <NoPosts>{loading ? 'loading...' : '표시할 리뷰가 없습니다...'}</NoPosts>
        )}
      </div>
      {<FetchMore loading={loading} fetchMorePosts={fetchMorePosts} />}
    </>
  );
}

export default React.memo(Stories);
