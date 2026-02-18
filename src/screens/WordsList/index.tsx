import { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";

import { FooterLoader } from "@/components/common/FooterLoader";
import { ScreenError } from "@/components/common/ScreenError";
import { ScreenLoader } from "@/components/common/ScreenLoader";
import { FloatingButton } from "@/components/wordsList/FloatingButton";
import { WordItem } from "@/components/wordsList/WordItem";

import { WORDS_LIST_NUM_COLUMNS } from "@/constants/wordsList";
import { useWords } from "@/hooks/useWords";
import { WordResponse } from "@/services/supabase/models/words";

import { styles } from "./style";

const SCROLL_TO_TOP_THRESHOLD = 200;

export function WordsListScreen() {
  const flatListRef = useRef<FlatList<WordResponse>>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useWords();

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

  function renderFooter() {
    if (isFetchingNextPage) {
      return <FooterLoader />;
    }
    return null;
  }

  if (isLoading) {
    return <ScreenLoader />;
  }

  if (error) {
    return (
      <ScreenError
        hasTabBar={true}
        title="Error loading words"
        description="Try again later"
        buttonLabel="Try again"
        onButtonPress={() => refetch()}
        isLoading={isRefetching}
      />
    );
  }

  const words = data?.pages.flatMap((page) => page.map((word) => word)) || [];

  if (words.length === 0) {
    return (
      <ScreenError
        hasTabBar={true}
        title="No words found"
        description="Try again later"
      />
    );
  }

  return (
    <>
      {showScrollToTop && (
        <FloatingButton onPress={handleScrollToTop} label="Scroll to top" />
      )}
      <FlatList
        ref={flatListRef}
        data={words}
        keyExtractor={(item) => item.id.toString()}
        numColumns={WORDS_LIST_NUM_COLUMNS}
        onScroll={handleScroll}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContentContainer}
        columnWrapperStyle={styles.listColumnWrapperContainer}
        renderItem={({ item, index }) => (
          <WordItem word={item.word} index={index} id={item.id.toString()} />
        )}
        ListFooterComponent={renderFooter}
      />
    </>
  );
}
