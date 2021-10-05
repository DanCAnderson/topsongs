import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';

const songs = require('../topSongs.json');

class SongTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: songs.slice(0,10),
            pageCount: Math.ceil(songs.length / 10)
        };
    }

    handlePageClick = (data) => {
        this.setState({data: songs.slice(data.selected * 10, data.selected * 10 + 10)});
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.data.map((song, index) => {
                        return <li key={index}>{song.ranking[2004]}. {song.title}, {song.artist}. {song.year}</li>
                    })}
                </ul>
                <ReactPaginate
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                />
            </div>
        );
    }
}

export default SongTable;