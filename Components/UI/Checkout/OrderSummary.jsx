import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import Paper from "@mui/material/Paper";
import styles from './OrderSummary.module.scss'
export default function OrderSummary({ selectedPackages }) {
console.log(selectedPackages)
  if(!selectedPackages) return 
  // Calculate total price
  const totalPrice = selectedPackages.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );
  return (
    <section className={`${styles.section}`}>
      <Typography variant="h5" component="h2">
        Order Summary
      </Typography>
      <div className={`${styles.summaryWrapper}`}>
        {selectedPackages.map((item, index) => {
          return (
            <Paper key={index} className={`${styles.card}`} elevation={2}>
              <div className={`${styles.link}`}>
                <div className={`${styles.imageWrapper} image-wrapper`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    priority={true}
                  />
                </div>
                <div className={`${styles.contentWrapper}`}>
                  <Typography
                    className={`${styles.title}`}
                    component="h3"
                    variant="subtitle1"
                    style={{lineHeight: "120%"}}
                  >
                    {item.title}
                  </Typography>
               <div className="price-wrapper flex align-bottom gap-4">
                   <Typography className={`${styles.price} mt-8 bold`} component="div" variant="h5">
                    {item.price}
                  </Typography>
                  {item.priceSuffix && 
                   <Typography className={`${styles.priceSuffix} mt-8`} component="div" variant="body2">
                    {item.priceSuffix}
                  </Typography>
                  }
                  
               </div>
                </div>
              </div>
            </Paper>
          );
        })}
        {/* Display total price */}
        {/* <div className={`${styles.totalWrapper}`}>
          <Typography className="total" component="div" variant="h6">
            Total: ${totalPrice}
          </Typography>
        </div> */}
      </div>
    </section>
  );
}

