import { Dimensions, Text, TouchableOpacity, View } from "react-native";

interface NumberPadProps {
  onKeyPress: (key: string) => void;
}

const NUM_PAD_KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["", "0", "backspace"],
];

export function NumberPad({ onKeyPress }: NumberPadProps) {
  const buttonSize = (Dimensions.get("window").width - 48) / 3 - 8;

  return (
    <View className="mt-10 items-center">
      {NUM_PAD_KEYS.map((row, rowIndex) => (
        <View key={rowIndex} className="mb-2 flex-row justify-center">
          {row.map((key) => {
            if (key === "") {
              return (
                <View
                  key={`empty-${rowIndex}`}
                  style={{ width: buttonSize, height: 56 }}
                />
              );
            }

            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.6}
                onPress={() => onKeyPress(key)}
                style={{ width: buttonSize, height: 56 }}
                className="mx-1 items-center justify-center rounded-xl bg-white"
              >
                {key === "backspace" ? (
                  <Text className="text-xl text-slate-600">⌫</Text>
                ) : (
                  <Text className="text-2xl font-semibold text-slate-900">
                    {key}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
    </View>
  );
}