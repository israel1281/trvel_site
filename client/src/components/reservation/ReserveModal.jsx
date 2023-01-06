import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import useFetch from '../../hooks/useFetch';
import './reserveModal.css';

export default function ReserveModal({ setOpen, hotelId }) {
    const [selectedRooms, setSelectedRooms] = useState([]);
    const { data, loading, error } = useFetch(`hotels/room/${hotelId}`);
    const { dates } = useContext(SearchContext);

    const handleSelection = (e) => {
        const selected = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            selected
                ? [...selectedRooms, value]
                : selectedRooms.filter((room) => room !== value)
        );
    };

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const date = new Date(start.getTime());
        let list = [];
        while (data <= end) {
            list.push(new Date(date).getTime());
            date.setDate(date.getDate() + 1);
        }
        return list;
    };

    const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);

    const availableDate = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        );
        return !isFound;
    };

    const navigate = useNavigate();

    const makeReservation = async () => {
        try {
            await Promise.all(
                selectedRooms.map((roomId) => {
                    const res = axios.put(`/rooms/availability${roomId}`, {
                        dates: allDates,
                    });
                    return res.data;
                })
            );
            setOpen(false);
            navigate('/');
        } catch (err) {}
    };
    return (
        <div className="reserve">
            {loading ? (
                'Please Wait'
            ) : (
                <div className="reserve-container">
                    <button
                        className="reserve_close"
                        onClick={() => setOpen(false)}
                    >
                        X
                    </button>
                    <span>Select your rooms</span>
                    {data.map((item) => (
                        <div className="reserve_item">
                            <div className="reserve_item-info">
                                <div className="reserve_title">
                                    {item.title}
                                </div>
                                <div className="reserve_desc">{item.desc}</div>
                                <div className="reserve_max">
                                    Max People: <b>{item.maxPeople}</b>
                                </div>
                                <div className="reserve_price">
                                    {item.price}
                                </div>
                            </div>
                            <div className="room_selection">
                                {item.roomNumbers.map((roomNumber) => (
                                    <div className="room_details">
                                        <label>{roomNumber.number}</label>
                                        <input
                                            type="checkbox"
                                            value={roomNumber._id}
                                            onChange={handleSelection}
                                            disabled={
                                                !availableDate(roomNumber)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={makeReservation}
                        className="reserve_button"
                    >
                        Reserve Now!
                    </button>
                </div>
            )}
        </div>
    );
}
