import { Text, View,Image } from "react-native-animatable";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import { ScrollView, TouchableOpacity } from "react-native";
import { categories, shortVideos, videos } from "../constants";
import ShortVideoCard from "../components/shortVideoCard";
import VideoCard from "../components/VideoCard";
import { fetchTrendingVideos } from "../api/youtube";

export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState ('All');
    const [videos, setVideos]= useState([]);

    useEffect(()=>{fetchData();
      },[])

    const fetchData = async ()=>{
      const data = await fetchTrendingVideos();
      console.log('video:', data[0]);
      setVideos(data);
    }

    return (
        <View className="flex-1 bg-[#212121] ">
    {/* top section */}
        <SafeAreaView className="flex-row justify-between mx-2">

            <View className="flex-row items-center space-x-0.5">
                <Image source={require('../assets/youtube.png')} className="h-8 w-8" />
                <Text className="text-white font-semibold text-2xl tracking-tighter">Youtube</Text>
            </View>

            <View className="flex-row items-center space-x-2.5">
                <Icon.Cast stroke="white" strokeWidth={1.2} height="22" />
                <Icon.Bell stroke="white" strokeWidth={1.2} height="22" />
                <Icon.Search stroke="white" strokeWidth={1.2} height="22" />
                <Image source={require('../assets/prof.png')} className="h-7 w-7 rounded-full"/>
                    
            </View>
        </SafeAreaView>


        <ScrollView className="flex-1 showsVerticalScrollIndicator={false}">
            <View className="py-1 pb-5">
            <ScrollView className="px-2" horizontal showsHorizontalScrollIndicator={false}>
              {
                categories.map((category, index)=>{
                    let isActive =category==activeCategory;
                    let textclass =  isActive? 'text-black': 'text-white';
                  
                  
                  return (
                    <TouchableOpacity
                      onPress={()=>setActiveCategory(category)}
                      key={index}
                      style={{backgroundColor: isActive? 'white': 'rgba(255,255,255,0.1)'}}
                      className="rounded-md p-1 px-3 mr-2"
                      >
                        <Text className={textclass}>{category}</Text>
                    </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
            </View>


{/* sugst video */}

{/* <VideoCard video={videos[3]}/> */}

            <View 
           className="mt-2 py-5 space-y-3 border-t-zinc-700 border-b-zinc-700 border-4 border-l-0 border-r-0">
            <View className="mx-4 flex-row items-center space-x-2">
              <Image source={require('../assets/shortsIcon.png')}
                className="h-6 w-5"/>
              <Text className="text-white font-semibold text-lg tracking-tighter">Shorts</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4">
                {
                    shortVideos.map((item, index)=> <ShortVideoCard item={item} key={index}/> )
                }
            </ScrollView>
            
          </View>

    {/* Videocard */}

            <View>
            <ScrollView showsVerticalScrollIndicator={false}>
            {
              videos.map((video, index) => <VideoCard video={video} key={index}/>)
            }
          </ScrollView>
            </View>


        </ScrollView>

        </View>
    )
}