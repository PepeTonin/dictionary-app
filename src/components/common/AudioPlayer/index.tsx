import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useRef } from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { styles } from "./style";

export function AudioPlayer({ audioSource }: { audioSource: string }) {
  const progress = useSharedValue(0);
  const didStartAnimation = useRef(false);
  const player = useAudioPlayer(audioSource);
  const status = useAudioPlayerStatus(player);

  function handleStop() {
    player.pause();
    player.seekTo(0);
  }

  function handlePlay() {
    player.seekTo(0);
    player.play();
  }

  useEffect(() => {
    if (!status.playing) {
      progress.value = 0;
      didStartAnimation.current = false;
      return;
    }
    const durationMs = status.duration * 1000;
    if (durationMs <= 0) return;
    if (!didStartAnimation.current) {
      didStartAnimation.current = true;
      progress.value = 0;
      progress.value = withTiming(1, {
        duration: durationMs,
        easing: Easing.linear,
      });
    }
  }, [progress, status.playing, status.duration]);

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={status.playing ? handleStop : handlePlay}>
        {status.playing ? (
          <FontAwesome name="stop-circle" size={24} color="black" />
        ) : (
          <FontAwesome name="play-circle" size={24} color="black" />
        )}
      </TouchableOpacity>

      <View style={styles.progressWrapper}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressBarFill, animatedFillStyle]} />
        </View>
      </View>
    </View>
  );
}
