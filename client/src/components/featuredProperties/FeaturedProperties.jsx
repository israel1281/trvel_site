import useFetch from '../../hooks/useFetch';
import './featuredProperties.css';
// import { FeaturedPropertyData } from './FeaturedPropertyData';

const FeaturedProperties = () => {
    const { data, loading, error } = useFetch('/hotels?featured=true&limit=4 ');
    return (
        <div className="fp">
            {loading ? (
                'Please Wait'
            ) : (
                <>
                    {Object.keys(data)?.map((fp) => {
                        return (
                            <div className="fpItem" key={fp._id}>
                                <img
                                    loading="lazy"
                                    // src={fp?.photos[0]}
                                    alt={fp.name}
                                    className="fpImg"
                                />
                                <span className="fpName">{fp.name}</span>
                                <span className="fpCity">{fp.city}</span>
                                <span className="fpPrice">
                                    Starting from {fp.cheapestPrice}
                                </span>
                                {fp.rating && (
                                    <div className="fpRating">
                                        <button>{fp.rating}</button>
                                        <span>Excellent</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default FeaturedProperties;
