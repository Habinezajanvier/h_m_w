import CircleIcon from '@mui/icons-material/Circle';
import "../assets/styles/components/carouselNavigation.scss"
import { useState } from 'react';

const CarouselNavigation = ({counts, defaultView, getValue}) => {
    const [active, setActive] = useState(defaultView);

  return (
    <div className='carouselNavigation flex c-pointer'>
        {
            [...Array(counts)].map((_,i) => (
                <CircleIcon key={i} className={active === i ? "active": ""}  onClick={() => {setActive(i); getValue(i)}} />
            ))
        }
    </div>
  )
}

export default CarouselNavigation;