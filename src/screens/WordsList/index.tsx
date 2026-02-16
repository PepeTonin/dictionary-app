import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

import { FloatingButton } from "@/components/wordsList/FloatingButton";
import { FooterLoader } from "@/components/wordsList/FooterLoader";
import { WordItem } from "@/components/wordsList/WordItem";

import { useWords } from "@/hooks/useWords";

import { WordResponse } from "@/services/supabase/models/words";

import { styles } from "./style";

const SCROLL_TO_TOP_THRESHOLD = 200;

export function WordsListScreen() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useWords();

  const flatListRef = useRef<FlatList<WordResponse>>(null);

  function handleScrollToTop() {
    flatListRef.current?.scrollToOffset({ offset: 0 });
  }

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    if (event.nativeEvent.contentOffset.y > SCROLL_TO_TOP_THRESHOLD) {
      setShowScrollToTop(true);
      return;
    }
    setShowScrollToTop(false);
  }

  function handleEndReached() {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }

  const [showScrollToTop, setShowScrollToTop] = useState(false);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      {showScrollToTop && (
        <FloatingButton onPress={handleScrollToTop} label="Scroll to top" />
      )}
      <FlatList
        ref={flatListRef}
        data={data?.pages.flatMap((page) => page.map((word) => word)) || []}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        onScroll={handleScroll}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        style={styles.listContainer}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={styles.listColumnWrapperContainer}
        renderItem={({ item, index }) => (
          <WordItem word={item.word} index={index} />
        )}
        ListFooterComponent={() => <FooterLoader />}
      />
    </>
  );
}
