"use client";

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import React, { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { Button } from "@/components/ui/button";
import { useWeather } from "@/hooks/use-weather";
import { DialogContent, DialogTitle } from "./ui/dialog";
import { Pin, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
export function Search() {
  const { setCity, pinnedLocations, setPinnedLocations } = useWeather();
  const [open, setOpen] = useState(false);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      types: ["geocode"],
    },
    debounce: 1000,
  });

  const filteredData = data.filter((suggestion) => {
    return !pinnedLocations.some((loc) => loc.place_id === suggestion.place_id);
  });

  const router = useRouter();

  const handleSelect =
    ({ description }: any) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API by setting the second parameter to "false"
      setCity(description);
      setValue(description, false);

      setOpen(false);
      setValue("");
      clearSuggestions();

      getGeocode({ address: description }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        router.push(`/?lat=${lat}&lng=${lng}`);
      });
    };

  return (
    <>
      <Button
        variant={"outline"}
        size={"lg"}
        onClick={() => setOpen(true)}
        className="h-9 w-full hitespace-nowrap px-4"
      >
        <span className="flex items-center text-xs md:text-sm text-muted-foreground gap-x-8">
          Search City or Zip Code...{" "}
        </span>
        <SearchIcon className="inline-flex ml-auto text-muted-foreground" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle />
        <DialogContent className="w-[90%] lg:min-w-[40%] rounded-md">
          <CommandInput
            placeholder="Search City or Zip Code..."
            value={value}
            onValueChange={setValue}
            disabled={!ready}
            onKeyDown={(e) => {
              if (e.key === "Home" || e.key === "End") {
                e.stopPropagation();
              }
            }}
          />
          {pinnedLocations.length > 0 && (
            <CommandList>
              <h1 className="text-sm font-medium px-2 mb-2 text-muted-foreground">
                Favorites
              </h1>
              {pinnedLocations.map((location) => (
                <div
                  className="flex items-center justify-between hover:bg-muted rounded-md px-2 cursor-auto select-none text-xs md:text-sm"
                  key={`pinned-${location.place_id}`}
                  onClick={handleSelect(location)}
                >
                  <span>{location.description}</span>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    key={`pinned-${location.place_id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const locationExists = pinnedLocations.some(
                        (loc) => loc.place_id === location.place_id
                      );
                      if (locationExists) {
                        setPinnedLocations(
                          pinnedLocations.filter(
                            (loc) => loc.place_id !== location.place_id
                          )
                        );
                        // remove the location from local storage
                        const updatedLocations = pinnedLocations.filter(
                          (loc) => loc.place_id !== location.place_id
                        );
                        localStorage.setItem(
                          "pinnedLocations",
                          JSON.stringify(updatedLocations)
                        );
                      }
                    }}
                  >
                    <Pin
                      className={
                        pinnedLocations.some(
                          (loc) => loc.place_id === location.place_id
                        )
                          ? "fill-current"
                          : ""
                      }
                    />
                  </Button>
                </div>
              ))}
            </CommandList>
          )}

          <CommandList>
            {status === "OK" &&
              filteredData.map((suggestion) => (
                // <React.Fragment key={suggestion.place_id}>

                <div
                  className="flex items-center justify-between hover:bg-muted space-y-1 rounded-md px-2 cursor-auto select-none text-xs md:text-sm"
                  key={suggestion.place_id}
                  onClick={handleSelect(suggestion)}
                >
                  <span className="w-full text-ellipsis truncate">
                    {suggestion.description}
                  </span>
                  <Button
                    variant={"ghost"}
                    size={"icon"}
                    key={suggestion.place_id}
                    onClick={(e) => {
                      e.stopPropagation();
                      const locationExists = pinnedLocations.some(
                        (loc) => loc.place_id === suggestion.place_id
                      );
                      if (locationExists) {
                        setPinnedLocations(
                          pinnedLocations.filter(
                            (loc) => loc.place_id !== suggestion.place_id
                          )
                        );
                        // remove the location from local storage
                        const updatedLocations = pinnedLocations.filter(
                          (loc) => loc.place_id !== suggestion.place_id
                        );
                        localStorage.setItem(
                          "pinnedLocations",
                          JSON.stringify(updatedLocations)
                        );
                      } else {
                        getGeocode({ address: suggestion.description }).then(
                          (results) => {
                            const { lat, lng } = getLatLng(results[0]);
                            const newLocation = {
                              coords: { lat: lat, lng: lng },
                              place_id: suggestion.place_id,
                              description: suggestion.description,
                            };
                            setPinnedLocations((prev) => {
                              const updated = [...prev, newLocation];
                              localStorage.setItem(
                                "pinnedLocations",
                                JSON.stringify(updated)
                              );
                              return updated;
                            });
                          }
                        );
                      }
                    }}
                  >
                    <Pin
                      className={
                        pinnedLocations.some(
                          (loc) => loc.place_id === suggestion.place_id
                        )
                          ? "fill-current"
                          : ""
                      }
                    />
                  </Button>
                </div>
                // </React.Fragment>
              ))}
          </CommandList>
        </DialogContent>
      </CommandDialog>
    </>
  );
}
