import 'package:flutter/material.dart';
import './shared/app_drawer.dart';
import './screen/ghiChu/ghiChuScreen.dart';
import './shared/dialog_utils.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: SafeArea(
        child: Scaffold(
          appBar: AppBar(
            title: const Text('Trang chủ'),
          ),
          body: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                DialogExample('Bạn đã ấn nút', 'Thông báo cực căng'),
              ],
            ),
          ),
          drawer: const AppDrawer(),
        ),
      ),
      routes: {
        GhiChuScreen.routeName: (ctx) => const GhiChuScreen(),
      },
    );
  }
}
