import React from "react";
import { useSelector } from "react-redux";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Pagination,
  PaginationItem,
} from "@mui/material";

import { isUserLoggedIn } from "../helpers/auth";

const CryptoTable = ({
  data,
  handleFavorite,
  handleUnfavorite,
  page,
  totalPages,
  handlePageChange,
}) => {
  const favoritesStore = useSelector((state) => state.favorites);
  const isFavorited = (coinId) => favoritesStore.includes(coinId);

  return (
    <Box>
      {data.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Price (USD)</TableCell>
                  <TableCell>24h Change (%)</TableCell>
                  {isUserLoggedIn() && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((coin) => (
                  <TableRow key={coin.id}>
                    <TableCell>{coin.name}</TableCell>
                    <TableCell>{coin.symbol}</TableCell>
                    <TableCell>{`$${coin.current_price.toFixed(2)}`}</TableCell>
                    <TableCell>
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                    {isUserLoggedIn() && (
                      <TableCell>
                        {isFavorited(coin.id) ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleUnfavorite(coin.id)}
                          >
                            Favorited
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleFavorite(coin.id)}
                          >
                            Favorite
                          </Button>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box mt={3} display="flex" justifyContent="center">
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              renderItem={(item) =>
                item.type === "previous" || item.type === "next" ? (
                  <PaginationItem {...item} />
                ) : null
              }
              variant="outlined"
              shape="rounded"
            />
          </Box>
        </>
      ) : (
        <Box
          mt={20}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <h4>No data found</h4>
        </Box>
      )}
    </Box>
  );
};

export default CryptoTable;
