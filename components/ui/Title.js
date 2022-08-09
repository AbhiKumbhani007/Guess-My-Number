import Colors from "../../constants/colors";
import { StyleSheet, Text, Platform } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    // fontFamily: "open-sans-bold",
    fontSize: 20,
    padding: 24,
    fontWeight: "900",
    color: Colors.white,
    textAlign: "center",
    borderWidth: Platform.select({ ios: 0, android: 1 }),
    borderColor: Colors.white,
    borderRadius: 10,
    maxWidth: "80%",
    width: 300,
  },
});
