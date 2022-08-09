import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import PrimaryButtons from "../components/ui/PrimaryButtons";

function GameOver({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 300;

  if (width < 300) {
    imageSize = 150;
  }

  if (height < 400) {
    imageSize = 80;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };

  return (
    <ScrollView style={styles.root}>
      <View style={styles.rootContainer}>
        <Title>Game Over!</Title>
        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            style={styles.image}
            source={require("../assets/images/success.png")}
          />
        </View>
        <Text style={styles.summry}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
        <PrimaryButtons onPress={onStartNewGame}>Start Over</PrimaryButtons>
      </View>
    </ScrollView>
  );
}

export default GameOver;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imageContainer: {
    // width: deviceWidth < 380 ? 150 : 300,
    // height: deviceWidth < 380 ? 150 : 300,
    // borderRadius: deviceWidth < 380 ? 75 : 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  rootContainer: {
    flexDirection: "column",
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  summry: {
    alignItems: "center",
    color: Colors.accent500,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 24,
  },
  highlight: {
    color: Colors.primary500,
  },
});
