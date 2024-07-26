import React, { PropsWithChildren } from 'react';

export interface ErrorBoundaryState {
  hasError: boolean;
}
/**
 * 错误监控捕获
 */
export class ErrorBoundary extends React.Component<PropsWithChildren, ErrorBoundaryState> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true });
    if (window.onerror && process.env.TRACKING_UPLOAD_ID) {
      console.log(error);
    }
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <div>出错了！</div>;
    }
    const { children } = this.props;
    return children;
  }
}
