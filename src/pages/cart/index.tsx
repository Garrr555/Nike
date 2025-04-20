import CartView from "@/components/views/cart";
import Head from "next/head";

type PropTypes = {
  setToaster: React.Dispatch<React.SetStateAction<{}>>;
};

export default function CartPage(props: PropTypes) {
  const { setToaster } = props;
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>

      <div className="container">
        <CartView setToaster={setToaster}/>
      </div>
    </>
  );
}
