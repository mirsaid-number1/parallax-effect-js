import { Grow, Paper } from "@mui/material";
import { makeStyles } from "../styles";
import {
  RefObject,
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import wallpaper from "../assets/wallpaper-min.webp";
import nestOneGroup from "../assets/Nest_One_group-min.webp";
import tvTower from "../assets/tv_tower-min.webp";
import fog4 from "../assets/fog_4-min.webp";
import interContinental from "../assets/interContinental-min.webp";
import interContinentalFog from "../assets/interContinental_fog-min.webp";
import nbuGroup from "../assets/Nbu_group-min.webp";
import nbuGroupFog from "../assets/Nbu_group_fog-min.webp";
import hiltonGroup from "../assets/Hilton_group-min.webp";
import hiltonGroupFog from "../assets/Hilton_group_fog-min.webp";
import throttle from "../utils/throttle";
import LoadingPage from "./LoadingPage";
type ImgRef = RefObject<HTMLImageElement>;

const useStyles = makeStyles()((theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    position: "relative",
    background: "transparent",
    height: "100vh",
    width: "100%",
    overflow: "hidden",
  },
  paper_loading: {
    visibility: "hidden",
  },
  wallpaperImg: {
    ...theme.mixins.parallax,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "150%",
    height: "200%",
    objectFit: "cover",
    objectPosition: "center",
    zIndex: 1,
  },
  text: {
    margin: "auto",
    ...theme.mixins.parallax,
    position: "relative",
    zIndex: 14,
    fontSize: "calc(45px + (70 - 45) * (100vw - 300px) / (800 - 300))",
    right: "4%",
    fontFamily: "'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif",
    pointerEvents: "auto",
    fontWeight: "bold",
    background:
      "linear-gradient(to bottom, #ffffff 40%, rgba(255, 255, 255, 0.5))",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  vignet: {
    position: "absolute",
    zIndex: 10,
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background:
      "radial-gradient(ellipse at center, rgba(0,0,0,0.05) 65%, rgba(0,0,0,0.8))",
  },

  nestOneGroup: {
    ...theme.mixins.parallax,
    position: "absolute",
    margin: "auto",
    bottom: "-10%",
    right: "0%",
    left: "0%",
    width: `80%`,
    height: "auto",
    zIndex: 2,

    [theme.breakpoints.down("desktop")]: {
      width: "110%",
      right: "80%",
      bottom: "-10%",
    },
    [theme.breakpoints.down("mid")]: {
      width: "140%",
      margin: "0",
      left: "-20%",
      bottom: "-12%",
    },
    [theme.breakpoints.down("ssm")]: {
      width: "230%",
      margin: "0",
      left: "-60%",
      bottom: "-10%",
    },
  },
  tvTower: {
    ...theme.mixins.parallax,
    position: "absolute",
    bottom: "-20%",
    right: "3%",
    width: "13%",
    height: "auto",
    zIndex: 2,

    [theme.breakpoints.down("desktop")]: {
      width: "18%",
      right: "1%",
    },
    [theme.breakpoints.down("mid")]: {
      width: "25%",
      right: "-4%",
    },
    [theme.breakpoints.down("ssm")]: {
      width: "40%",
      right: "-8%",
    },
  },
  fog4: {
    ...theme.mixins.parallax,
    position: "absolute",
    bottom: "-10%",
    right: "-18%",
    width: "65%",
    height: "100%",
    opacity: 0.3,
    zIndex: 5,
  },
  interContinental: {
    ...theme.mixins.parallax,
    position: "absolute",
    margin: "auto",
    bottom: "-10%",
    width: "38%",
    height: "auto",
    right: 0,
    left: 0,
    zIndex: 3,
    [theme.breakpoints.down("desktop")]: {
      width: "48%",
      right: "1%",
    },
    [theme.breakpoints.down("mid")]: {
      width: "55%",
      right: "-4%",
    },
    [theme.breakpoints.down("ssm")]: {
      visibility: "hidden",
      width: "94%",
      right: "-11%",
      bottom: "-5%",
    },
  },
  interContinentalFog: {
    ...theme.mixins.parallax,
    position: "absolute",
    margin: "auto",
    bottom: "-12%",
    right: 0,
    left: 0,
    height: "auto",
    opacity: 0.3,
    zIndex: 5,
    [theme.breakpoints.down("ssm")]: {
      bottom: "-6%",
      visibility: "hidden",
    },
  },
  nbuGroup: {
    ...theme.mixins.parallax,
    position: "absolute",
    margin: "auto",
    bottom: "-25%",
    width: "78%",
    height: "auto",
    left: "5%",
    zIndex: 4,
    [theme.breakpoints.down("desktop")]: {
      width: "98%",
      left: "1%",
    },
    [theme.breakpoints.down("mid")]: {
      width: "125%",
      left: "-4%",
      bottom: "-20%",
    },
    [theme.breakpoints.down("ssm")]: {
      width: "140%",
      left: "0%",
      bottom: "-12%",
    },
  },
  nbuGroupFog: {
    ...theme.mixins.parallax,
    position: "absolute",
    margin: "auto",
    width: "65%",
    bottom: "-28%",
    left: "-5%",
    opacity: 0.5,
    zIndex: 5,

    [theme.breakpoints.down("desktop")]: {
      width: "98%",
      left: "1%",
    },
    [theme.breakpoints.down("mid")]: {
      width: "125%",
      left: "-4%",
      bottom: "-25%",
    },
    [theme.breakpoints.down("ssm")]: {
      width: "140%",
      left: "0%",
      bottom: "-15%",
    },
  },
  hiltonGroup: {
    ...theme.mixins.parallax,
    position: "absolute",
    margin: "auto",
    bottom: "-12%",
    right: "-10%",
    width: "70%",
    height: "auto",
    zIndex: 6,
    [theme.breakpoints.down("desktop")]: {
      width: "80%",
      right: "-15%",
    },
    [theme.breakpoints.down("mid")]: {
      width: "100%",
      right: "-25%",
      bottom: "-10%",
    },
    [theme.breakpoints.down("ssm")]: {
      width: "110%",
      right: "-30%",
      bottom: "-6%",
    },
  },
  hiltonGroupFog: {
    ...theme.mixins.parallax,
    position: "absolute",
    margin: "auto",
    right: 0,
    left: 0,
    bottom: "-12%",
    opacity: 0.3,
    zIndex: 7,
    [theme.breakpoints.down("ssm")]: {
      bottom: "-6%",
    },
  },
}));

const Parallax = () => {
  const { classes, cx } = useStyles();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 10;

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };
  const parallaxRefs: Array<RefObject<HTMLImageElement>> = [
    ...new Array(10),
  ].map(() => createRef());

  const mainRef = useRef<HTMLDivElement>(null);
  const updateParallaxEffect = useCallback(
    (xValue: number, yValue: number) => {
      const rotateDegree = (xValue / (window.innerWidth / 2)) * 20;

      parallaxRefs.forEach((el) => {
        const element = el.current!;
        if (element) {
          const speedx =
            (element.dataset &&
              element.dataset.speedx &&
              parseFloat(element.dataset.speedx)) ||
            0;
          const speedy =
            (element.dataset &&
              element.dataset.speedy &&
              parseFloat(element.dataset.speedy)) ||
            0;
          const speedz =
            (element.dataset &&
              element.dataset.speedz &&
              parseFloat(element.dataset.speedz)) ||
            0;
          const rotatation =
            (element.dataset &&
              element.dataset.rotation &&
              parseFloat(element.dataset.rotation)) ||
            0;

          const isInLeft =
            parseFloat(getComputedStyle(element).left) < window.innerWidth / 2
              ? 1
              : -1;

          const zValue =
            (0 - parseFloat(getComputedStyle(element).left)) * isInLeft * 0.1;

          const centerationx = element.dataset.centerationx || "-50%";
          const centerationy = element.dataset.centerationy || "-50%";

          element.style.transform = `translateX(calc(${centerationx} + ${
            -xValue * speedx
          }px)) rotateY(${
            rotateDegree * rotatation
          }deg) translateY(calc(${centerationy} + ${
            -yValue * speedy
          }px)) perspective(2300px) translateZ(${zValue * speedz}px)`;
        }
      });
    },
    [parallaxRefs]
  );
  useEffect(() => {
    updateParallaxEffect(0, 0);
  }, [parallaxRefs, updateParallaxEffect]);
  useEffect(() => {
    const handleMouseMove = throttle((e: MouseEvent) => {
      const xValue = e.clientX - window.innerWidth / 2;
      const yValue = e.clientY - window.innerHeight / 2;
      updateParallaxEffect(xValue, yValue);
    }, 100);
    const handleOrientation = throttle((event: DeviceOrientationEvent) => {
      const { gamma, beta } = event;
      if (gamma !== null && beta !== null) {
        updateParallaxEffect(gamma * 6, beta * 10);
      }
    }, 100);
    mainRef?.current?.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("deviceorientation", handleOrientation);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      mainRef?.current?.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("deviceorientation", handleOrientation);
    };
  }, [parallaxRefs, updateParallaxEffect]);
  console.log({ imagesLoaded });
  return (
    <Grow in={true} style={{ transformOrigin: "center center" }} timeout={500}>
      <Paper ref={mainRef} className={classes.paper}>
        <Paper
          className={cx(
            classes.paper,
            imagesLoaded < totalImages ? classes.paper_loading : ""
          )}
        >
          <div className={classes.vignet}></div>
          <h1 className={classes.text}>Tashkent</h1>
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={wallpaper}
            alt="wallpaper"
            className={classes.wallpaperImg}
            ref={parallaxRefs[0] as ImgRef}
            data-speedx="0.3"
            data-speedy="0.2"
            data-centerationx="-16.8%"
            data-centerationy="-5%"
            data-speedz="1"
            data-distance="200"
            data-rotation="0.5"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={nestOneGroup}
            className={classes.nestOneGroup}
            alt="Nest One"
            ref={parallaxRefs[1] as ImgRef}
            data-speedx="0.13"
            data-speedy="0.1"
            data-centerationx="-2%"
            data-centerationy="-5%"
            data-speedz="1"
            data-distance="200"
            data-rotation="0.2"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={tvTower}
            className={classes.tvTower}
            alt="Nest One"
            ref={parallaxRefs[2] as ImgRef}
            data-speedx="0.07"
            data-speedy="0.05"
            data-centerationx="-12%"
            data-centerationy="-5%"
            data-speedz="1"
            data-distance="200"
            data-rotation="0.1"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={fog4}
            className={classes.fog4}
            alt="Fog_4"
            ref={parallaxRefs[3] as ImgRef}
            data-speedx="0.18"
            data-speedy="0.12"
            data-centerationx="-12%"
            data-centerationy="-5%"
            data-speedz="0.1"
            data-distance="200"
            data-rotation="0.1"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={interContinental}
            className={classes.interContinental}
            alt="InterContinental"
            ref={parallaxRefs[4] as ImgRef}
            data-speedx="0.11"
            data-speedy="0.1"
            data-centerationx="-2%"
            data-centerationy="-5%"
            data-speedz="1"
            data-distance="200"
            data-rotation="0.1"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={interContinentalFog}
            className={classes.interContinentalFog}
            alt="InterContinentalFog"
            ref={parallaxRefs[5] as ImgRef}
            data-speedx="0.18"
            data-speedy="0.12"
            data-centerationx="-2%"
            data-centerationy="-5%"
            data-speedz="0.1"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={nbuGroup}
            className={classes.nbuGroup}
            alt="NbuGroup"
            ref={parallaxRefs[6] as ImgRef}
            data-speedx="0.11"
            data-speedy="0.1"
            data-centerationx="-2%"
            data-centerationy="-5%"
            data-speedz="2"
            data-distance="200"
            data-rotation="0.1"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={nbuGroupFog}
            className={classes.nbuGroupFog}
            alt="NbuGroupFog"
            ref={parallaxRefs[7] as ImgRef}
            data-speedx="0.18"
            data-speedy="0.12"
            data-centerationx="-2%"
            data-centerationy="-5%"
            data-speedz="0.3"
            data-distance="200"
            data-rotation="0.1"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={hiltonGroup}
            className={classes.hiltonGroup}
            alt="HiltonGroup"
            ref={parallaxRefs[8] as ImgRef}
            data-speedx="0.1"
            data-speedy="0.05"
            data-centerationx="-15%"
            data-centerationy="-5%"
            data-speedz="0.8"
            data-distance="200"
            data-rotation="0.1"
            aria-hidden
          />
          <img
            loading="lazy"
            onLoad={handleImageLoad}
            src={hiltonGroupFog}
            className={classes.hiltonGroupFog}
            alt="HiltonGroupFog"
            ref={parallaxRefs[9] as ImgRef}
            data-speedx="0.18"
            data-speedy="0.12"
            data-centerationx="-2%"
            data-centerationy="-5%"
            data-speedz="0.1"
            data-distance="200"
            data-rotation="0.01"
            aria-hidden
          />
        </Paper>
        {imagesLoaded < totalImages ? (
          <LoadingPage
            style={{
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        ) : null}
      </Paper>
    </Grow>
  );
};

export default Parallax;
