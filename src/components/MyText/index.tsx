import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform, TextStyle, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function MyText({
  children,
  textStyle,
  lines = 3,
  selectable,
  isExpandable = false
}: {
  children?: string | string[];
  textStyle?: TextStyle;
  lines?: number;
  selectable?: boolean;
  isExpandable?: boolean
}) {
  const { colors } = useTheme();
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Text
        selectable={selectable}
        style={[styles.text, { color: colors.text }, textStyle]}
        numberOfLines={isExpanded ? undefined : lines}
        onTextLayout={(e) => {
          const linesCount = e.nativeEvent.lines.length;
          setIsTextTruncated(linesCount >= lines);
        }}
      >
        {children}
      </Text>
      
      {(isTextTruncated === true && isExpandable) && (
        <Pressable onPress={toggleExpanded}>
          <Text style={[styles.toggleButton, { color: colors.primary }]}>
            {isExpanded ? 'See less' : 'See more'}
          </Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'DMSans-Regular',
  },
  toggleButton: {
    marginVertical: 8,
    fontWeight: 'bold',
  },
});