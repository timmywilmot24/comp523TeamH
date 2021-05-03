import React, { Component, useRef, useEffect } from 'react';

export const FadeInView = (props) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 3000,
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return (
		<Animated.View
			style={{
				// ...props.style,
				opacity: fadeAnim,
			}}
		>
			{props.children}
		</Animated.View>
	);
};
