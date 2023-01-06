import './hotel.css';
import {
    Navbar,
    Header,
    MailList,
    Footer,
    ReserveModal,
} from '../../components';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { MdCancel, MdLocationOn } from 'react-icons/md';
import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';

const Hotel = () => {
    //image Sliding
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);
    const [openReservation, setOpenReservation] = useState(false);

    //Api Fetch
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const { data, loading, error } = useFetch(`/hotels/find${id}`);

    const { date, options } = useContext(SearchContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    };

    const days = dayDifference(date[0].endDate, date[0].startDate);

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    //Handling the Reservation Button

    const handleReservation = () => {
        if (user) {
            setOpenReservation(true);
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? (
                'Please Wait...'
            ) : (
                <>
                    <div className="hotelContainer">
                        {open && (
                            <div className="slider">
                                <MdCancel
                                    className="close"
                                    onClick={() => setOpen(false)}
                                />
                                <FaArrowAltCircleLeft
                                    className="arrow"
                                    onClick={() => handleMove('l')}
                                />
                                <div className="sliderWrapper">
                                    <img
                                        src={data.photos[slideNumber]}
                                        alt=""
                                        className="sliderImg"
                                    />
                                </div>
                                <FaArrowAltCircleRight
                                    className="arrow"
                                    onClick={() => handleMove('r')}
                                />
                            </div>
                        )}
                        <div className="hotelWrapper">
                            <butto
                                onClick={handleReservation}
                                className="bookNow"
                            >
                                Reserve or Book Now!
                            </butto>
                            <h1 className="hotelTitle">{data.name}</h1>
                            <div className="hotelAddress">
                                <MdLocationOn />
                                <span>{data.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location – {data.distance}m from
                                center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over ${data.cheapestPrice} at this
                                property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {data.photos?.map((photo, i) => (
                                    <div className="hotelImgWrapper" key={i}>
                                        <img
                                            onClick={() => handleOpen(i)}
                                            src={photo}
                                            alt=""
                                            className="hotelImg"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailsTexts">
                                    <h1 className="hotelTitle">{data.title}</h1>
                                    <p className="hotelDesc">{data.desc}</p>
                                </div>
                                <div className="hotelDetailsPrice">
                                    <h1>Perfect for a {days}-night stay!</h1>
                                    <span>
                                        Located in the real heart of Krakow,
                                        this property has an excellent location
                                        score of 9.8!
                                    </span>
                                    <h2>
                                        <b>
                                            $
                                            {days *
                                                data.cheapestPrice *
                                                options.room}
                                        </b>{' '}
                                        ({days} nights)
                                    </h2>
                                    <button>Reserve or Book Now!</button>
                                </div>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>
                </>
            )}
            {openReservation && (
                <ReserveModal setOpen={setOpenReservation} hotelId={id} />
            )}
        </div>
    );
};

export default Hotel;
