import Carousel from 'react-bootstrap/Carousel';
import furniture from '../assets/furniture.webp'
import tv from '../assets/5c28b798715ba85f.webp'
import phone from'../assets/phone.webp'
import './Carousel.css'

function CarouselDemo() {
    return (
        <Carousel>
          <Carousel.Item>
            <img className='carousel-image' src={furniture}/>
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <img className='carousel-image' src={phone}/>
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
          <img className='carousel-image' src={tv}/>
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      );
    }

export default CarouselDemo;