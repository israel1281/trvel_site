import useFetch from '../../hooks/useFetch';
import './featured.css';
// import { FeaturedData } from './FeaturedData';

const Featured = () => {
    const { data, loading, error } = useFetch(
        process.env.REACT_APP_FEATURED_URL
    );
    return (
        <div className="featured">
            {loading ? (
                'Please Wait..'
            ) : (
                <>
                    {data.map((featured, index) => {
                        return (
                            <div className="featuredItem" key={index}>
                                <img
                                    src={featured.image}
                                    alt={featured.propertyName}
                                    className="featuredImg"
                                />
                                <div className="featuredTitles">
                                    <h1>{featured.propertyName}</h1>
                                    <p>{data[index]} properties</p>
                                </div>
                            </div>
                        );
                    })}
                </>
            )}
        </div>
    );
};

export default Featured;
