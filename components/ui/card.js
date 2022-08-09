import Colors from "../../constants/colors";
import { View, StyleSheet, Dimensions } from "react-native";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: deviceWidth < 380 ? 12 : 36,
    marginHorizontal: 24,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});
