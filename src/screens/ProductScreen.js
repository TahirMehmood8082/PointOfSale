import {
  SafeAreaView,
} from "react-native";
import productScreenStyle from '../ProjectStyles/ProductScreenStyle'
import List from '../components/Products/list';
import { useNavigation } from '@react-navigation/native'



const ProductScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView
      style={productScreenStyle.productScreenSafeArea}
    >
      <List/>
      
    </SafeAreaView>
  );
};

export default ProductScreen;
