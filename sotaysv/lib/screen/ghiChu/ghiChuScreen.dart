import 'package:flutter/material.dart';
import '../../shared/app_drawer.dart';

class GhiChuScreen extends StatelessWidget {
  const GhiChuScreen({super.key});
  static const routeName = '/ghichu';

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Ghi chú'),
        ),
        body: const Center(
          child: Text("Ghi chú ở đây"),
        ),
        drawer: const AppDrawer(),
      ),
    );
  }
}
