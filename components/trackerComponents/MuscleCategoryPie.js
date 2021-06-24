import React, { Component } from "react";
import { PieChart } from "react-native-svg-charts";
import { Text } from "react-native-svg";

export default class MuscleCategoryPie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSlice: "",
    };
  }

  render() {
    const data = this.props.data;
    const total = this.props.max;

    const Labels = ({ slices, height, width }) => {
      return slices.map((slice, index) => {
        return (
          <Text
            key={index}
            x={slice.pieCentroid[0]}
            y={slice.pieCentroid[1]}
            fill={"black"}
            textAnchor={"middle"}
            alignmentBaseline={"middle"}
            fontSize={12}
            stroke={"black"}
            strokeWidth={0.05}
          >
            {Math.round((slice.data.value / total) * 100) + "%"}
          </Text>
        );
      });
    };

    const pieData = data
      .filter((cat) => cat.sets > 0)
      .map((cat, index) => ({
        key: cat.id,
        value: cat.sets,
        svg: {
          fill: cat.color,
          onPress: () => this.setState({ selectedSlice: cat.id }),
        },
        arc: {
          outerRadius: this.state.selectedSlice === cat.id ? "100%" : "95%",
          padAngle: this.state.selectedSlice === cat.id ? 0.08 : 0.04
        },
      }));

    return (
      <PieChart
        style={{ height: 240, marginVertical: 10 }}
        data={pieData}
        valueAccessor={({ item }) => item.value}
        outerRadius={"95%"}
      >
        <Labels />
      </PieChart>
    );
  }
}